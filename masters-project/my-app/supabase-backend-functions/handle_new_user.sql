
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, email_confirmed_at)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.email,
    NEW.email_confirmed_at
  );
  RETURN NEW;
END;
