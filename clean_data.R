# clean_data.R
library(tidyverse)
library(janitor)

# 1. Read raw Kaggle data 
raw_games <- read_csv("Games.csv")

# 2. Clean and structure the dataset
cleaned_games <- raw_games %>%
  clean_names() %>%
  # Map your actual dataset columns to standardized names
  rename(
    home_pts = home_score,
    visitor_pts = away_score,
    game_date = game_date,
    season = game_type # Fallback if no specific season column exists
  ) %>%
  # Drop missing values in crucial columns
  drop_na(home_pts, visitor_pts, game_date) %>%
  # Convert dates properly
  mutate(game_date = as.Date(game_date)) %>%
  # Arrange chronologically to find historical "firsts" (Scorigamis)
  arrange(game_date) %>%
  group_by(home_pts, visitor_pts) %>%
  mutate(
    is_scorigami = row_number() == 1,
    first_date = min(game_date)
  ) %>%
  ungroup()

# 3. Save clean file for the Quarto site
write_csv(cleaned_games, "cleaned_games.csv")
message("Data cleaning complete! 'cleaned_games.csv' created.")
