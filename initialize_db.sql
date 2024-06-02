CREATE TABLE Users (
	user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	username VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	role VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	created_at TIMESTAMP DEFAULT current_timestamp(),
	updated_at TIMESTAMP DEFAULT current_timestamp()
);


CREATE TABLE ElderlyAccountInfo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(50) NOT NULL,
  date_of_birth DATE NOT NULL,
  about_me TEXT,
  height FLOAT NOT NULL,
  weight FLOAT NOT NULL,
  emergency_number VARCHAR(15) NOT NULL,
  FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

CREATE TABLE CaregiverAccountInfo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  city VARCHAR(50) NOT NULL,
  date_of_birth DATE NOT NULL,
  about_me TEXT,
  rating FLOAT,
  vote_count INT,
  FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

CREATE TABLE AuthorizationOfCare (
	elderly_id UUID NOT NULL,
	caregiver_id UUID NOT NULL,
	document_url VARCHAR(2083),
	PRIMARY KEY (elderly_id, caregiver_id),
	FOREIGN KEY(elderly_id) REFERENCES ElderlyAccountInfo(user_id),
	FOREIGN KEY(caregiver_id) REFERENCES CaregiverAccountInfo(user_id)
);

CREATE TABLE NoteEntity (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID NOT NULL,
	related_user_ids UUID[],
	related_urls VARCHAR(2083)[],
	title VARCHAR(100) NOT NULL,
	content TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT current_timestamp(),
	updated_at TIMESTAMP DEFAULT current_timestamp(),
	FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

CREATE TABLE MedicamentEntity (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name VARCHAR(255) NOT NULL,
	dosage VARCHAR(255) NOT NULL,
	manufacturer VARCHAR(255),
	active_substance VARCHAR(255) NOT NULL,
	composition TEXT,
	contraindications TEXT,
	indications TEXT,
	created_at TIMESTAMP DEFAULT current_timestamp(),
	updated_at TIMESTAMP DEFAULT current_timestamp()
);

CREATE TABLE MedicalTreatmentEntity (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID NOT NULL,
	medicament_ids UUID[],
	diagnosis_date DATE NOT NULL,
	diagnosis TEXT NOT NULL,
	treatment_plan TEXT NOT NULL,
	certificate_url VARCHAR(2083),
	prescription_url VARCHAR(2083),
	FOREIGN KEY(user_id) REFERENCES Users(user_id),
);

CREATE TABLE KnowledgeBaseArticle (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID NOT NULL,
	title VARCHAR(100) NOT NULL,
	content TEXT NOT NULL,
	tags VARCHAR(255)[],
	url VARCHAR(2083),
	created_at TIMESTAMP DEFAULT current_timestamp(),
	updated_at TIMESTAMP DEFAULT current_timestamp(),
	FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

CREATE TABLE Event (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_ids UUID[],
    time TIMESTAMP NOT NULL,
    location VARCHAR(255),
    description TEXT,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE Alarm (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    trigger_time TIMESTAMP NOT NULL,
    message TEXT,
    FOREIGN KEY(event_id) REFERENCES Event(id)
);