// Supabase Client Initialization Configuration
const SUPABASE_URL = "https://skduyahufdicgyfgrafm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrZHV5YWh1ZmRpY2d5ZmdyYWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MTM3MzMsImV4cCI6MjEwNTM4OTczM30.x73M0hLyIdiSyKJmqljiSLgJfzaz3y6DHZoydLXQgtI"; 

// Check if library is present
if (!window.supabase) {
    console.error("Supabase CDN library not loaded.");
}

// Create singleton client instance
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.sb = supabaseClient;