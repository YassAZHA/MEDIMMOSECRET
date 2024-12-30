-- Drop existing type if exists
DROP TYPE IF EXISTS booking_status CASCADE;

-- Create booking status enum
CREATE TYPE booking_status AS ENUM ('waiting', 'confirmed');

-- Drop existing policies
DROP POLICY IF EXISTS "booking_select_policy" ON bookings;
DROP POLICY IF EXISTS "booking_insert_policy" ON bookings;
DROP POLICY IF EXISTS "booking_update_policy" ON bookings;
DROP POLICY IF EXISTS "booking_delete_policy" ON bookings;

-- Create simplified booking policies
CREATE POLICY "booking_select_policy"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "booking_insert_policy"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (
    check_out > check_in AND
    EXISTS (
      SELECT 1 FROM properties p
      WHERE p.id = property_id
      AND p.available = true
    )
  );

CREATE POLICY "booking_update_policy"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (check_out > check_in);

CREATE POLICY "booking_delete_policy"
  ON bookings FOR DELETE
  TO authenticated
  USING (true);

-- Create function to calculate booking price
CREATE OR REPLACE FUNCTION calculate_booking_price(
  p_property_id uuid,
  p_check_in date,
  p_check_out date
)
RETURNS numeric AS $$
DECLARE
  v_price numeric;
  v_nights integer;
BEGIN
  -- Get property price
  SELECT price INTO v_price
  FROM properties
  WHERE id = p_property_id;

  -- Calculate number of nights
  v_nights := p_check_out - p_check_in;

  RETURN v_price * v_nights;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to set total price
CREATE OR REPLACE FUNCTION set_booking_total_price()
RETURNS TRIGGER AS $$
BEGIN
  NEW.total_price := calculate_booking_price(NEW.property_id, NEW.check_in, NEW.check_out);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for total price calculation
DROP TRIGGER IF EXISTS tr_set_booking_total_price ON bookings;
CREATE TRIGGER tr_set_booking_total_price
  BEFORE INSERT OR UPDATE OF check_in, check_out, property_id ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION set_booking_total_price();