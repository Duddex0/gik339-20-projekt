-- Radera tabellen om den redan finns
DROP TABLE IF EXISTS movies;

-- Skapa tabellen movies
CREATE TABLE IF NOT EXISTS movies (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- Auto-increment för id
  title VARCHAR(40) NOT NULL,                    -- Titel på filmen
  releaseDate DATE NOT NULL,                     -- Releasedatum
  director VARCHAR(40) NOT NULL,                 -- Regissör
  price DECIMAL(10,2) NOT NULL                   -- Pris
);

-- Lägg till 10 filmer
INSERT INTO movies (title, releaseDate, director, price) VALUES
('The Shawshank Redemption', '1994-09-23', 'Frank Darabont', 150),
('The Godfather', '1972-03-24', 'Francis Ford Coppola', 200),
('The Dark Knight', '2008-07-18', 'Christopher Nolan', 180),
('Pulp Fiction', '1994-10-14', 'Quentin Tarantino', 170),
('Schindlers List', '1993-12-15', 'Steven Spielberg', 160),
('Forrest Gump', '1994-07-06', 'Robert Zemeckis', 140),
('Inception', '2010-07-16', 'Christopher Nolan', 190),
('Fight Club', '1999-10-15', 'David Fincher', 130),
('The Matrix', '1999-03-31', 'Lana Wachowski', 150),
('Goodfellas', '1990-09-19', 'Martin Scorsese', 180);

SELECT * FROM movies;
