import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://iomzbbebknzjvfzmeocu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvbXpiYmVia256anZmem1lb2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTYyNDgsImV4cCI6MjA3NTM3MjI0OH0.eZ2LYfQAzn-3c0zWzCMXBJGEkt-s_WUWtJJdro-obts";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
