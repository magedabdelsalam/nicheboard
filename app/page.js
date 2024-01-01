"use client";
import AuthForm from "./auth-form";
import JobForm from "/components/JobForm"; // Fix import path
import JobList from "/components/JobList"; // Fix import path
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const addJob = (job) => {
    setJobs([...jobs, job]);
  };
  return (
    <div className="row">
      <div>
        <h1>Job Listings</h1>
        {supabase.auth.user() ? <JobForm addJob={addJob} /> : null}
        <JobList jobs={jobs} />
      </div>
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  );
}
