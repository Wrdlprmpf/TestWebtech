-- DROP TABLE public.account;
-- DROP TABLE public.spending;

CREATE TABLE public.account
(
    accountid serial PRIMARY KEY,
    username varchar(100) NOT NULL,
    password varchar(100) NOT NULL
);

INSERT INTO public.account (accountid, username, password) VALUES (1, 'rekenaar', '1234');
INSERT INTO public.account (accountid, username, password) VALUES (2, 'wrdlprmpf', '1234');
INSERT INTO public.account (accountid, username, password) VALUES (3, 'ly0306', '1234');

CREATE TABLE public.spending
(
    position serial PRIMARY KEY,
    accountid integer REFERENCES account(accountid),
    name varchar(100) NOT NULL,
    amount decimal NOT NULL,
    type varchar(50) NOT NULL,
    date date NOT NULL
);

INSERT INTO public.spending ("position", accountid, name, amount, type, date) VALUES (1, 3, 'sandwich', 4, 'food', '2020-08-20');
INSERT INTO public.spending ("position", accountid, name, amount, type, date) VALUES (2, 3, 'burger', 2, 'food', '2020-04-21');