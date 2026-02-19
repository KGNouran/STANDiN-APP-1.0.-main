
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

// Diese Werte kommen aus dem Supabase Projekt-Dashboard (Settings -> API)
const supabaseUrl = 'https://bzdnzogotatzbhqjzgns.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6ZG56b2dvdGF0emJocWp6Z25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5NzM3MTksImV4cCI6MjA4NjU0OTcxOX0.US7DT90byekv2gPV-duram0L1FY7xrMHRJIOA1NQk0A';

export const supabase = createClient(supabaseUrl, supabaseKey);