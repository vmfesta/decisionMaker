CREATE TABLE decisions (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255),
    adm_link VARCHAR(255),
    sub_link VARCHAR(255),
    result_link VARCHAR(255),
    email VARCHAR()
);

CREATE TABLE pool (
    id BIGSERIAL PRIMARY KEY,
    decision_id INTEGER REFERENCES decisions (id),
    option_description VARCHAR(255),
    option_title VARCHAR(255),
    votes INTEGER
);

