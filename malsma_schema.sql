PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS agent_run (
    run_id INTEGER PRIMARY KEY,
    agent_name VARCHAR(255) NOT NULL,
    provider VARCHAR(100),
    model_version VARCHAR(100),
    prompt_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS iso_control (
    control_id VARCHAR(80) PRIMARY KEY,
    control_number VARCHAR(10) NOT NULL,
    title VARCHAR(225) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS measure_type (
    measure_type_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS agent_run_control (
    run_id INTEGER NOT NULL,
    control_id VARCHAR(80) NOT NULL,
    PRIMARY KEY (run_id, control_id),
    FOREIGN KEY (run_id) REFERENCES agent_run(run_id),
    FOREIGN KEY (control_id) REFERENCES iso_control(control_id)
);

CREATE TABLE IF NOT EXISTS iso_control_measure_type (
    icmt_id INTEGER PRIMARY KEY,
    control_id VARCHAR(80) NOT NULL,
    measure_type_id INTEGER NOT NULL,
    FOREIGN KEY (control_id) REFERENCES iso_control(control_id),
    FOREIGN KEY (measure_type_id) REFERENCES measure_type(measure_type_id)
);

CREATE TABLE IF NOT EXISTS concrete_measure (
    cm_id INTEGER PRIMARY KEY,
    icmt_id INTEGER NOT NULL,
    cm_label VARCHAR(255) NOT NULL,
    cm_description TEXT,
    created_by_run_id INTEGER,
    FOREIGN KEY (icmt_id) REFERENCES iso_control_measure_type(icmt_id),
    FOREIGN KEY (created_by_run_id) REFERENCES agent_run(run_id)
);

CREATE TABLE IF NOT EXISTS tools_documents (
    td_id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    td_type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS concrete_measure_tools_documents (
    cm_td_id INTEGER PRIMARY KEY,
    cm_id INTEGER NOT NULL,
    td_id INTEGER NOT NULL,
    source_url VARCHAR(2048),
    verification TEXT,
    created_by_run_id INTEGER,
    FOREIGN KEY (cm_id) REFERENCES concrete_measure(cm_id),
    FOREIGN KEY (td_id) REFERENCES tools_documents(td_id),
    FOREIGN KEY (created_by_run_id) REFERENCES agent_run(run_id)
);
