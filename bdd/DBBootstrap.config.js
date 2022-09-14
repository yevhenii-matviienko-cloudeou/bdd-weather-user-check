module.exports = {
  retrieveWeather: (params) => `
  update weathers
  set processing=true,
      updated_date=now()
  where id = (
      select id
      from weathers
      where not processing
      and not processed
      and env='${params.bddEnv}'
      limit 1
  ) returning *;
  `
}
