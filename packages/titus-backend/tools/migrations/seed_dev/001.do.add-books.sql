CREATE TABLE books(
  id        SERIAL,
  author    TEXT  NOT NULL,
  title     TEXT  NOT NULL,
  published DATE  NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO books (author, title, published)
VALUES
('Mary Shelley', 'Frankenstein', '1818-01-01'),
('Robert Louis Stevenson', 'Treasure Island', '1883-11-14'),
('Alexandre Dumas', 'The Three Musketeers', '1844-03-01'),
('Jane Austen', 'Pride and Prejudice', '1813-01-28'),
('Charles Dickens', 'Great Expectations', '1860-01-01');