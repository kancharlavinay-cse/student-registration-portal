import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const COURSES = {
  CSE: {
    name: "Computer Science & Engineering",
    short: "CSE",
    icon: "</>",
    theme: "cyan",
    keywords: "Code · Build · Innovate"
  },
  ECE: {
    name: "Electronics & Communication Engineering",
    short: "ECE",
    icon: "⌁",
    theme: "violet",
    keywords: "Connect · Design · Create"
  },
  EEE: {
    name: "Electrical & Electronics Engineering",
    short: "EEE",
    icon: "ϟ",
    theme: "amber",
    keywords: "Power · Control · Progress"
  },
  MECH: {
    name: "Mechanical Engineering",
    short: "MECHANICAL",
    icon: "⚙",
    theme: "green",
    keywords: "Design · Build · Transform"
  },
  AI: {
    name: "Artificial Intelligence & Data Science",
    short: "AI & DS",
    icon: "◉",
    theme: "pink",
    keywords: "Analyze · Learn · Create"
  },
  CIVIL: {
    name: "Civil Engineering",
    short: "CIVIL",
    icon: "▥",
    theme: "blue",
    keywords: "Plan · Build · Shape"
  }
};

const STORAGE_KEY = "studentPortal.students.v1";
const SESSION_KEY = "studentPortal.session.v1";

function loadStudents() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function makeRegistrationId(course, students) {
  const year = new Date().getFullYear();
  const prefix = "SEC";
  const count = students.filter(s => s.course === course).length + 1;
  return `${prefix}${year}${course}${String(count).padStart(5, "0")}`;
}

function Home({ go }) {
  return (
    <main className="page home redesigned-home">
      <div className="home-bg" />
      <div className="home-overlay" />
      <header className="home-nav">
        <button className="home-logo" onClick={() => go("home")}>
          <span className="logo-mark">SV</span>
          <span className="home-college"><strong>SREE VENKATESHWARA COLLEGE OF ENGINEERING</strong><small>STUDENT REGISTRATION PORTAL</small></span>
        </button>
        <div className="home-nav-actions"><span className="status-dot"/> ONLINE PORTAL</div>
      </header>
      <section className="hero-new">
        <div className="hero-copy-new">
          <div className="hero-eyebrow"><span/> WELCOME TO SVCE</div>
          <h1>Student<br/><span>Registration</span><br/>Portal</h1>
          <p>One simple place to register, access your student profile, and manage your information.</p>
          <div className="hero-actions-new">
            <button className="hero-btn hero-btn-primary" onClick={() => go("courses")}><span>01</span><b>SIGN UP</b><i>→</i></button>
            <button className="hero-btn hero-btn-secondary" onClick={() => go("login")}><span>02</span><b>LOGIN</b><i>→</i></button>
          </div>
        </div>
        <div className="hero-info-card">
          <div className="info-top"><span>SVCE</span><small>EST. ENGINEERING CAMPUS</small></div>
          <div className="info-line"/>
          <div className="info-stat"><strong>06</strong><span>Engineering<br/>Branches</span></div>
          <div className="info-stat"><strong>01</strong><span>Student<br/>Portal</span></div>
          <div className="info-note">Choose your course and experience a short cinematic introduction before registration.</div>
        </div>
      </section>
      <footer className="hero-footer-new"><span>LEARN</span><i/> <span>GROW</span><i/> <span>BUILD YOUR FUTURE</span><em>SREE VENKATESHWARA COLLEGE OF ENGINEERING</em></footer>
    </main>
  );
}

function Header({ go, title = "STUDENT REGISTRATION" }) {
  return (
    <header className="app-header">
      <button className="brand-button" onClick={() => go("home")}>
        <span className="logo small">🎓</span>
        <span><strong>SREE VENKATESHWARA COLLEGE OF ENGINEERING</strong><small>LEARN · GROW · BUILD YOUR FUTURE</small></span>
      </button>
      <button className="header-home" onClick={() => go("home")}>⌂ Home</button>
    </header>
  );
}

function CourseSelection({ selected, setSelected, go }) {
  return (
    <main className="page inner-page">
      <Header go={go} />
      <section className="content course-content">
        <div className="step-label">STEP 2 OF 6 · COURSE SELECTION</div>
        <h1>WELCOME TO <span>STUDENT REGISTRATION</span></h1>
        <h2>Please select your branch / course</h2>
        <p className="muted">Choose the course you are interested in and continue with your registration.</p>

        <div className="course-grid">
          {Object.entries(COURSES).map(([key, course]) => (
            <button
              key={key}
              className={`course-card ${course.theme} ${selected === key ? "selected" : ""}`}
              onClick={() => setSelected(key)}
            >
              <div className="course-icon">{course.icon}</div>
              <h3>{course.short}</h3>
              <p>{course.name}</p>
              <span>{course.keywords}</span>
              {selected === key && <i className="check">✓</i>}
            </button>
          ))}
        </div>

        <div className="actions">
          <button className="text-btn" onClick={() => go("home")}>← Back to Home</button>
          <button
            className="btn primary continue"
            disabled={!selected}
            onClick={() => go("animation")}
          >
            CONFIRM <b>→</b>
          </button>
        </div>
      </section>
    </main>
  );
}

function CourseVisual({ course }) {
  if (course.short === "CSE") return (
    <div className="visual visual-cse">
      <div className="visual-window terminal-window">
        <div className="terminal-top"><i/><i/><i/><span>student@svce:~</span></div>
        <pre>{`const future = {
  branch: "CSE",
  skills: ["coding", "AI", "software"]
};

build(future);`}<em>_</em></pre>
      </div>
      <div className="floating-code card-a">&lt; / &gt;<small>WEB DEV</small></div>
      <div className="floating-code card-b">{`{ API }`}<small>BACKEND</small></div>
      <div className="floating-code card-c">01 10 01<small>ALGORITHM</small></div>
      <div className="code-orbit">⌘</div>
    </div>
  );

  if (course.short === "ECE") return (
    <div className="visual visual-ece">
      <div className="pcb">
        <div className="chip"><span>ECE</span></div>
        <span className="trace t1"/><span className="trace t2"/><span className="trace t3"/><span className="trace t4"/>
        <span className="led l1"/><span className="led l2"/><span className="led l3"/>
        <span className="component c1"/><span className="component c2"/><span className="component c3"/>
      </div>
      <div className="signal-wave">∿ ∿ ∿ ∿ ∿</div>
      <div className="ece-chip-label">CIRCUIT<br/><small>COMMUNICATION SYSTEM</small></div>
    </div>
  );

  if (course.short === "EEE") return (
    <div className="visual visual-eee">
      <div className="power-sky">⚡</div>
      <div className="tower tower-a"><i/><i/><i/></div>
      <div className="tower tower-b"><i/><i/><i/></div>
      <div className="tower tower-c"><i/><i/><i/></div>
      <div className="power-line line-a"/><div className="power-line line-b"/>
      <div className="eee-panel"><b>POWER GRID</b><span>VOLTAGE</span><strong>440 V</strong></div>
    </div>
  );

  if (course.short === "MECHANICAL") return (
    <div className="visual visual-mech">
      <div className="gear gear-big">⚙</div>
      <div className="gear gear-small">⚙</div>
      <div className="piston"><span/><span/><b>ENGINE</b></div>
      <div className="shaft"/>
      <div className="mech-label">MECHANISM<br/><small>GEARS · SHAFT · MOTION</small></div>
    </div>
  );

  if (course.short === "AI & DS") return (
    <div className="visual visual-ai">
      <div className="robot-head"><div className="robot-eye e1"/><div className="robot-eye e2"/><div className="robot-mouth"/></div>
      <div className="neural n1"/><div className="neural n2"/><div className="neural n3"/><div className="neural n4"/>
      <div className="ai-data">DATA <span>→</span> MODEL <span>→</span> AI</div>
      <div className="robot-label">INTELLIGENT MACHINES<small>LEARN · PREDICT · AUTOMATE</small></div>
    </div>
  );

  return (
    <div className="visual visual-civil">
      <div className="blueprint">
        <div className="building-line b1"/><div className="building-line b2"/><div className="building-line b3"/>
        <div className="floor-line f1"/><div className="floor-line f2"/><div className="floor-line f3"/>
        <div className="crane"><span/><b/><i/></div>
      </div>
      <div className="civil-label">BLUEPRINT MODE<small>PLAN · STRUCTURE · BUILD</small></div>
    </div>
  );
}

function CourseAnimation({ course, go }) {
  const [progress, setProgress] = useState(0);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const started = performance.now();
    let raf = 0;
    const tick = () => {
      const value = Math.min((performance.now() - started) / 5000, 1);
      setProgress(value);
      setScene(Math.min(3, Math.floor(value * 4)));
      if (value < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const timeout = setTimeout(() => go("registration"), 5000);
    return () => { cancelAnimationFrame(raf); clearTimeout(timeout); };
  }, [go]);

  const copy = {
    CSE: ["CODE. CREATE. INNOVATE.", "Computer Science & Engineering", "Coding • Software • AI"],
    ECE: ["CONNECT THE WORLD.", "Electronics & Communication Engineering", "Circuits • Signals • Communication"],
    EEE: ["POWER EVERY POSSIBILITY.", "Electrical & Electronics Engineering", "Power • Machines • Control"],
    MECHANICAL: ["DESIGN. BUILD. MOVE.", "Mechanical Engineering", "Gears • Engines • Manufacturing"],
    "AI & DS": ["TEACH MACHINES TO THINK.", "Artificial Intelligence & Data Science", "Data • Robotics • Intelligence"],
    CIVIL: ["BUILD STRONGER TOMORROW.", "Civil Engineering", "Structures • Planning • Construction"]
  }[course.short];

  const sceneTitles = {
    CSE: ["CODE LAB", "WEB DEVELOPMENT", "AI SYSTEMS", "CLOUD SOFTWARE"],
    ECE: ["MICROCHIP", "CIRCUIT BOARD", "SIGNALS", "COMMUNICATION"],
    EEE: ["POWER GRID", "ELECTRIC MOTOR", "CONTROL PANEL", "ENERGY"],
    MECHANICAL: ["GEARS", "ENGINE", "CAD DESIGN", "MANUFACTURING"],
    "AI & DS": ["DATA SCIENCE", "NEURAL NETWORK", "ROBOTICS", "COMPUTER VISION"],
    CIVIL: ["BLUEPRINT", "SITE SURVEY", "CONSTRUCTION", "INFRASTRUCTURE"]
  }[course.short];

  const fileKey = course.short === "AI & DS" ? "ai" : course.short.toLowerCase();
  const slug = fileKey;
  const sceneImages = [1,2,3,4].map(n => `/course-scenes/${fileKey}-${n}.svg`);

  return (
    <main className={`animation-page cinematic-page ${course.theme} anim-${slug}`}>
      <div className="cinematic-bg"/>
      <div className="animation-grid" />
      <div className="scanlines" />
      <div className="cinematic-topbar">
        <span><b>SVCE</b> · SREE VENKATESHWARA COLLEGE OF ENGINEERING</span>
        <small>COURSE EXPERIENCE · 00:05</small>
      </div>
      <section className="cinematic-content">
        <div className="cinematic-copy">
          <div className="course-badge"><span>{course.icon}</span>{course.short}</div>
          <p>{copy[0]}</p>
          <h1>{copy[1]}</h1>
          <h2>{copy[2]}</h2>
          <div className="scene-caption"><span>0{scene + 1}</span><b>{sceneTitles[scene]}</b></div>
        </div>
        <div className={`scene-stage offline-scene stage-${slug}`}>
          {sceneImages.map((src, i) => (
            <img key={src} src={src} alt={`${course.short} scene ${i + 1}`} className={scene === i ? "active" : ""} />
          ))}
          <div className="scene-vignette"/>
          <div className="scene-corner tl"/><div className="scene-corner tr"/><div className="scene-corner bl"/><div className="scene-corner br"/>
          <div className="scene-number">SCENE <b>0{scene + 1}</b> / 04</div>
        </div>
      </section>
      <div className="cinematic-bottom">
        <div className="progress-line"><span style={{width: `${progress * 100}%`}} /></div>
        <div className="scene-dots">{[1,2,3,4].map((_,i)=><i key={i} className={scene===i?'on':''}/>)}</div>
        <div className="cinematic-status"><span>{progress < .98 ? "ENTERING YOUR COURSE" : "OPENING REGISTRATION"}</span><small>{Math.max(0, 5 - progress * 5).toFixed(1)}s</small></div>
      </div>
    </main>
  );
}

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands",
  "Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir",
  "Ladakh","Lakshadweep","Puducherry"
];

const initialForm = {
  fullName: "", dob: "", gender: "", profilePhoto: "",
  mobile: "", email: "", alternatePhone: "",
  address: "", city: "", state: "", pin: "", country: "India",
  qualificationType: "", marks10: "", marks12OrDiploma: "",
  fatherName: "", fatherContact: "", motherName: "", motherContact: "",
  username: "", password: "", confirmPassword: "", terms: false
};

function Field({ label, name, value, onChange, type="text", required=false, placeholder="", children }) {
  return (
    <label className="field">
      <span>{label}{required && <em>*</em>}</span>
      {children || <input name={name} value={value} onChange={onChange} type={type} placeholder={placeholder} required={required} />}
    </label>
  );
}

function Registration({ course, go, onRegistered }) {
  const [form, setForm] = useState({
    ...initialForm,
    department: course.name,
    branch: course.short
  });
  const [error, setError] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  const update = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({...f, [name]: type === "checkbox" ? checked : value}));
  };

  const handlePhoto = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Please select an image file.");
    if (file.size > 3 * 1024 * 1024) return setError("Photo must be smaller than 3 MB.");
    const reader = new FileReader();
    reader.onload = () => setForm(f => ({...f, profilePhoto: reader.result}));
    reader.readAsDataURL(file);
  };

  const submit = e => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (!form.terms) return setError("Please accept the Terms & Conditions.");
    if (!form.qualificationType) return setError("Please select 12th / Intermediate or Diploma.");
    const students = loadStudents();
    const registrationId = makeRegistrationId(course.short, students);
    const student = {
      ...form,
      registrationId,
      course: course.short,
      courseName: course.name,
      createdAt: new Date().toISOString()
    };
    students.push(student);
    saveStudents(students);
    onRegistered(student);
    go("success");
  };

  return (
    <main className="page inner-page">
      <Header go={go} />
      <section className="content form-content improved-form-content">
        <div className="form-hero">
          <div>
            <div className="step-label">STEP 4 OF 6 · STUDENT REGISTRATION</div>
            <h1>Complete Your <span>Registration</span></h1>
            <p className="muted">Selected course: <b>{course.name}</b></p>
          </div>
          <div className="course-chip">{course.icon}<span>{course.short}</span></div>
        </div>

        <form onSubmit={submit}>
          <FormSection title="1. Personal Details">
            <Field label="Full Name" name="fullName" value={form.fullName} onChange={update} required />
            <Field label="Date of Birth" name="dob" value={form.dob} onChange={update} type="date" required />
            <Field label="Gender" name="gender" value={form.gender} onChange={update} required>
              <select name="gender" value={form.gender} onChange={update} required>
                <option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option>
              </select>
            </Field>

            <div className="photo-field">
              <span>Profile Photo</span>
              <div className="photo-upload-row">
                <div className="photo-preview-box">
                  {form.profilePhoto ? <img src={form.profilePhoto} alt="Profile preview" /> : <div><b>PHOTO</b><small>Preview</small></div>}
                </div>
                <div className="photo-upload-controls">
                  <label className="upload-btn">
                    {form.profilePhoto ? "Change Photo" : "Upload Photo"}
                    <input type="file" accept="image/*" onChange={handlePhoto} />
                  </label>
                  <small>JPG, PNG · Max 3 MB</small>
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection title="2. Contact Details">
            <Field label="Mobile Number" name="mobile" value={form.mobile} onChange={update} required />
            <Field label="Email Address" name="email" value={form.email} onChange={update} type="email" required />
            <Field label="Alternate Phone" name="alternatePhone" value={form.alternatePhone} onChange={update} />
            <Field label="Address" name="address" value={form.address} onChange={update} />
            <Field label="City" name="city" value={form.city} onChange={update} />
            <Field label="State" name="state" value={form.state} onChange={update} required>
              <select name="state" value={form.state} onChange={update} required>
                <option value="">Select state</option>
                {INDIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </Field>
            <Field label="PIN Code" name="pin" value={form.pin} onChange={update} inputMode="numeric" />
            <Field label="Country" name="country" value={form.country} onChange={update} />
          </FormSection>

          <FormSection title="3. Education Details">
            <Field label="10th / SSC Marks" name="marks10" value={form.marks10} onChange={update} required placeholder="Enter marks / percentage" />
            <Field label="12th / Intermediate or Diploma" name="qualificationType" value={form.qualificationType} onChange={update} required>
              <select name="qualificationType" value={form.qualificationType} onChange={update} required>
                <option value="">Select qualification</option>
                <option value="12th / Intermediate">12th / Intermediate</option>
                <option value="Diploma">Diploma</option>
              </select>
            </Field>
            <Field
              label={form.qualificationType === "Diploma" ? "Diploma Marks" : "12th / Intermediate Marks"}
              name="marks12OrDiploma"
              value={form.marks12OrDiploma}
              onChange={update}
              required
              placeholder="Enter marks / percentage"
            />
          </FormSection>

          <FormSection title="4. Parent / Guardian Details">
            <Field label="Father / Guardian Name" name="fatherName" value={form.fatherName} onChange={update} required />
            <Field label="Father / Guardian Contact Number" name="fatherContact" value={form.fatherContact} onChange={update} required />
            <Field label="Mother / Guardian Name" name="motherName" value={form.motherName} onChange={update} required />
            <Field label="Mother / Guardian Contact Number" name="motherContact" value={form.motherContact} onChange={update} required />
          </FormSection>

          <FormSection title="5. Account Details">
            <Field label="Username" name="username" value={form.username} onChange={update} required />
            <Field label="Password" name="password" value={form.password} onChange={update} type="password" required />
            <Field label="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={update} type="password" required />
            <label className="terms">
              <input type="checkbox" name="terms" checked={form.terms} onChange={update} />
              <span>I accept the <button type="button" className="terms-link" onClick={() => setShowTerms(true)}>Terms &amp; Conditions</button>.</span>
            </label>
          </FormSection>

          {error && <div className="error">{error}</div>}
          <div className="form-actions">
            <button type="button" className="text-btn" onClick={() => go("courses")}>← Change Course</button>
            <button className="btn primary" type="submit">SUBMIT REGISTRATION <b>→</b></button>
          </div>
        </form>
      </section>

      {showTerms && (
        <div className="modal-backdrop" onClick={() => setShowTerms(false)}>
          <div className="terms-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div><span>SVCE</span><h2>Terms &amp; Conditions</h2></div>
              <button onClick={() => setShowTerms(false)} aria-label="Close">×</button>
            </div>
            <div className="terms-body">
              <p>By registering, you confirm that the information provided by you is accurate and complete.</p>
              <p>You are responsible for keeping your login credentials and Registration ID safe.</p>
              <p>Your submitted information will be used for student registration and profile management.</p>
              <p>You agree to update your profile when information changes and not to share your account with others.</p>
            </div>
            <button className="btn primary full" onClick={() => setShowTerms(false)}>I UNDERSTAND</button>
          </div>
        </div>
      )}
    </main>
  );
}

function FormSection({ title, children }) {
  return <section className="form-section"><h2>{title}</h2><div className="fields">{children}</div></section>;
}

function Success({ student, go }) {
  return (
    <main className="page success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <p className="step-label">STEP 5 OF 6</p>
        <h1>REGISTRATION SUCCESSFUL</h1>
        <p>Welcome, <b>{student.fullName}</b>!</p>
        <div className="registration-id">
          <small>YOUR REGISTRATION ID</small>
          <strong>{student.registrationId}</strong>
        </div>
        <p className="muted">Please keep this ID safe. You can use it to log in to your student profile.</p>
        <button className="btn primary" onClick={() => go("home")}>CONTINUE TO HOME →</button>
      </div>
    </main>
  );
}

function Login({ go, onLogin }) {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = e => {
    e.preventDefault();
    const students = loadStudents();
    const student = students.find(s =>
      [s.registrationId, s.fullName, s.email, s.username].some(v => (v || "").toLowerCase() === identity.toLowerCase()) &&
      s.password === password
    );
    if (!student) return setError("Invalid login details. Use your Registration ID, name, email, or username with your password.");
    localStorage.setItem(SESSION_KEY, student.registrationId);
    onLogin(student);
    go("profile");
  };

  return (
    <main className="page login-page">
      <Header go={go} />
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-icon">↪</div>
          <p className="step-label">STEP 6 OF 6 · LOGIN</p>
          <h1>WELCOME <span>BACK!</span></h1>
          <p className="muted">Access your student profile</p>
          <form onSubmit={submit}>
            <Field label="Registration ID / Name / Email" name="identity" value={identity} onChange={e => setIdentity(e.target.value)} required placeholder="Enter your login ID" />
            <Field label="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} type="password" required placeholder="Enter password" />
            {error && <div className="error">{error}</div>}
            <button className="btn primary full" type="submit">LOGIN →</button>
          </form>
          <button className="text-btn" onClick={() => go("courses")}>New student? Sign up</button>
        </div>
      </div>
    </main>
  );
}

function Profile({ student, go, setStudent }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(student);

  const update = e => setDraft(d => ({...d, [e.target.name]: e.target.value}));

  const handlePhoto = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 3 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => setDraft(d => ({...d, profilePhoto: reader.result}));
    reader.readAsDataURL(file);
  };

  const save = () => {
    const students = loadStudents().map(s => s.registrationId === student.registrationId ? {...s, ...draft} : s);
    saveStudents(students);
    setStudent({...draft});
    setEditing(false);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    go("home");
  };

  return (
    <main className="page inner-page">
      <Header go={go} />
      <section className="content profile-content">
        <div className="profile-head">
          <div>
            <div className="step-label">STUDENT PROFILE</div>
            <h1>{editing ? "Edit Your Profile" : <>Welcome, <span>{student.fullName}</span></>}</h1>
            <p className="muted">{student.courseName}</p>
          </div>
          <div className="profile-actions">
            {!editing ? <button className="btn glass" onClick={() => setEditing(true)}>EDIT PROFILE</button> : <>
              <button className="text-btn" onClick={() => {setDraft(student);setEditing(false)}}>Cancel</button>
              <button className="btn primary" onClick={save}>SAVE CHANGES</button>
            </>}
            <button className="text-btn danger" onClick={logout}>LOGOUT</button>
          </div>
        </div>

        <div className="profile-grid">
          <section className="profile-card identity-card">
            <div className="avatar">{draft.profilePhoto ? <img src={draft.profilePhoto} alt="Profile" /> : "👨‍🎓"}</div>
            {editing && <label className="profile-upload">Change Photo<input type="file" accept="image/*" onChange={handlePhoto}/></label>}
            <h2>{draft.fullName}</h2>
            <p>{student.registrationId}</p>
            <strong>{student.course}</strong>
          </section>

          <section className="profile-card">
            <h2>Personal &amp; Contact Details</h2>
            <InfoRows student={draft} editing={editing} fields={["fullName","dob","gender","mobile","email","alternatePhone","address","city","state","pin","country"]} update={update} />
          </section>

          <section className="profile-card">
            <h2>Education Details</h2>
            <InfoRows student={draft} editing={editing} fields={["marks10","qualificationType","marks12OrDiploma"]} update={update} />
          </section>

          <section className="profile-card">
            <h2>Parent / Guardian Details</h2>
            <InfoRows student={draft} editing={editing} fields={["fatherName","fatherContact","motherName","motherContact"]} update={update} />
          </section>

          <section className="profile-card">
            <h2>Account &amp; Registration</h2>
            <InfoRows student={draft} editing={editing} fields={["username","registrationId","createdAt"]} update={update} locked={["registrationId","createdAt"]} />
          </section>
        </div>
      </section>
    </main>
  );
}

function InfoRows({ student, editing, fields, update, locked=[] }) {
  const labels = {
    fullName:"Full Name", dob:"Date of Birth", gender:"Gender", mobile:"Mobile Number", email:"Email Address",
    alternatePhone:"Alternate Phone", address:"Address", city:"City", state:"State", pin:"PIN Code",
    country:"Country", marks10:"10th / SSC Marks", qualificationType:"Qualification",
    marks12OrDiploma:"12th / Intermediate or Diploma Marks", fatherName:"Father / Guardian Name",
    fatherContact:"Father / Guardian Contact", motherName:"Mother / Guardian Name",
    motherContact:"Mother / Guardian Contact", username:"Username", registrationId:"Registration ID",
    createdAt:"Registration Date"
  };
  return <div className="info-rows">{fields.map(f => (
    <div className="info-row" key={f}>
      <span>{labels[f]}</span>
      {editing && !locked.includes(f) ? (
        f === "state" ? (
          <select name={f} value={student[f] || ""} onChange={update}>
            <option value="">Select state</option>{INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
          </select>
        ) : f === "qualificationType" ? (
          <select name={f} value={student[f] || ""} onChange={update}>
            <option value="">Select qualification</option><option>12th / Intermediate</option><option>Diploma</option>
          </select>
        ) : <input name={f} value={student[f] || ""} onChange={update} type={f === "dob" ? "date" : "text"} />
      ) : <b>{f === "createdAt" && student[f] ? new Date(student[f]).toLocaleString() : (student[f] || "—")}</b>}
    </div>
  ))}</div>;
}

function App() {
  const [page, setPage] = useState("home");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem(SESSION_KEY);
    if (id) {
      const found = loadStudents().find(s => s.registrationId === id);
      if (found) setStudent(found);
    }
  }, []);

  const go = target => setPage(target);

  const course = useMemo(() => COURSES[selectedCourse] || COURSES.CSE, [selectedCourse]);

  if (page === "home") return <Home go={go} />;
  if (page === "courses") return <CourseSelection selected={selectedCourse} setSelected={setSelectedCourse} go={go} />;
  if (page === "animation") return <CourseAnimation course={course} go={go} />;
  if (page === "registration") return <Registration course={course} go={go} onRegistered={setStudent} />;
  if (page === "success") return <Success student={student} go={go} />;
  if (page === "login") return <Login go={go} onLogin={setStudent} />;
  if (page === "profile" && student) return <Profile student={student} setStudent={setStudent} go={go} />;

  return <Home go={go} />;
}

createRoot(document.getElementById("root")).render(<App />);
