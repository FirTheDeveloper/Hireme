"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const defaultDepartments = ["Community", "Development", "Creative"];

export default function SetupPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState(defaultDepartments);
  const [form, setForm] = useState({ name: "", description: "", robloxGroupId: "", accentColor: "#ff6f9d" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function updateForm(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateDepartment(index: number, value: string) {
    setDepartments((current) => current.map((department, departmentIndex) => departmentIndex === index ? value : department));
  }

  function addDepartment() {
    setDepartments((current) => [...current, ""]);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const response = await fetch("/api/setup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, departments }) });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error ?? "Could not save configuration.");
      setSaving(false);
      return;
    }
    router.push("/");
  }

  return (
    <main className="setup-shell">
      <div className="setup-orbit" aria-hidden="true" />
      <Link className="setup-brand" href="/">HIREME <span>/ FIRST SETUP</span></Link>
      <section className="setup-panel">
        <div className="setup-intro">
          <p className="eyebrow"><span className="eyebrow-dot" /> ONE GROUP / ONE PORTAL</p>
          <h1>Let&apos;s set<br /><em>the signal.</em></h1>
          <p>Tell HireMe who this portal belongs to. You can refine departments, questions, and permissions from the control panel later.</p>
        </div>
        <form className="setup-form" onSubmit={submit}>
          <label>Group name<input required value={form.name} onChange={(event) => updateForm("name", event.target.value)} placeholder="Astral" /></label>
          <label>Short introduction<textarea value={form.description} onChange={(event) => updateForm("description", event.target.value)} placeholder="A few words about the group and what you build." rows={3} /></label>
          <label>Roblox group ID <span className="optional">optional for now</span><input inputMode="numeric" value={form.robloxGroupId} onChange={(event) => updateForm("robloxGroupId", event.target.value)} placeholder="1234567" /></label>
          <div className="field-label">Departments <span className="optional">who can own applications</span></div>
          <div className="department-list">{departments.map((department, index) => <input key={index} value={department} onChange={(event) => updateDepartment(index, event.target.value)} placeholder={`Department ${index + 1}`} />)}</div>
          <button className="button button-primary setup-submit" disabled={saving} type="submit">{saving ? "Saving configuration..." : "Create application portal"}<span className="arrow-icon">↗</span></button>
          {error && <p className="setup-error" role="alert">{error}</p>}
          <button className="add-department" type="button" onClick={addDepartment}>+ Add another department</button>
        </form>
      </section>
      <p className="setup-footnote">Self-hosted configuration · Your group data stays with your instance.</p>
    </main>
  );
}