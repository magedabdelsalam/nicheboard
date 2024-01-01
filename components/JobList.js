import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const { data, error } = await supabase
        .from("jobs")
        .select("title, description");
      if (error) {
        console.error("Error fetching jobs:", error);
      } else {
        setJobs(data);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      {jobs.map((job, index) => (
        <div key={index}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
}
