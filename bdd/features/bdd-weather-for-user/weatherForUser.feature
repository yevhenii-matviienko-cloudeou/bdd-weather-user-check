@-
@-
@weatherForUser
@DBbootstrap=retrieveWeather

Feature: Weather for user

  Scenario: Position for user from ip
    Given ip for user weather is @ip_address
    And id for user weather is @id
    And table for user weather is weathers
    When getting position for ip
    Then write location to db lat lat_position lon lon_position

  Scenario: Weather for positon of user
    When getting weather from user position
    Then write weather to db apparent_temperature temp cloudcover clouds windspeed_10m wind shortwave_radiation solar_rad sunrise sunrise sunset sunset

  Scenario: Finish process
    When finish process for weathers

