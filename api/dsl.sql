CREATE TABLE public.users
(
    id       serial       NOT NULL,
    username varchar(255) NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_username_key UNIQUE (username)
);

CREATE TABLE public.shows
(
    id          serial                                                            NOT NULL,
    title       varchar(255)                                                      NOT NULL,
    image       varchar(255) DEFAULT 'https://www.tibs.org.tw/images/default.jpg' NULL,
    description text                                                              NULL,
    air_date    date         DEFAULT CURRENT_DATE                                 NULL,
    CONSTRAINT table_name_pk PRIMARY KEY (id)
);

CREATE TABLE public.awards
(
    id        serial                          NOT NULL,
    title     varchar(255) DEFAULT 'Untitled' NULL,
    fk_shows  int                             NOT NULL,
    fk_winner int                             NULL,
    CONSTRAINT awards_pk PRIMARY KEY (id),
    CONSTRAINT awards_shows_id_fk FOREIGN KEY (fk_shows)
        REFERENCES public.shows (id)
        ON DELETE CASCADE
        -- Allows me to change the show id
        ON UPDATE CASCADE
);

CREATE TABLE public.entries
(
    id          serial                                                            NOT NULL,
    title       varchar(255)                                                      NOT NULL,
    image       varchar(255) DEFAULT 'https://www.tibs.org.tw/images/default.jpg' NULL,
    description text                                                              NULL,
    fk_awards   int                                                               NOT NULL,
    CONSTRAINT entries_pk PRIMARY KEY (id),
    CONSTRAINT entries_awards_id_fk FOREIGN KEY (fk_awards) REFERENCES public.awards (id) ON DELETE CASCADE
);

ALTER TABLE public.awards
    ADD CONSTRAINT winner___fk FOREIGN KEY (fk_winner) REFERENCES public.entries (id) ON DELETE SET NULL;

CREATE TABLE public.votes
(
    id         serial NOT NULL,
    "comment"  text   NULL,
    fk_users   int    NOT NULL,
    fk_entries int    NOT NULL,
    CONSTRAINT votes_pk PRIMARY KEY (id),
    CONSTRAINT votes_entries_id_fk FOREIGN KEY (fk_entries) REFERENCES public.entries (id) ON DELETE CASCADE,
    CONSTRAINT votes_users_id_fk FOREIGN KEY (fk_users) REFERENCES public.users (id) ON DELETE CASCADE
);
