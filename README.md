## Influxdb

```sql
create database wi_backend
```

## Retention Policies
- Create 1d Default RP, Delete all raw records on after 1 days set default:
```sql
CREATE RETENTION POLICY "one_day" ON "wi_backend" DURATION 1d REPLICATION 1 DEFAULT
```
- Create 3 months RP Delete mean data after 3 months 
```sql
CREATE RETENTION POLICY "three_months" ON "wi_backend" DURATION 12w REPLICATION 1
```

## Continuous Queries
- Create CQ that run every 1h to get 1h-resolution data of durations
 ```sql
CREATE CONTINUOUS QUERY cq_1h_2 ON wi_backend 
BEGIN
 SELECT mean("duration") AS "duration" INTO wi_backend.three_months.mean_response_times_2 
 FROM wi_backend.one_day.response_times 
 GROUP BY time(1h), username, path 
END
```
## Using
```sql
USE wi_backend
```
```sql
SELECT * from response_times
```
```sql
SELECT * from three_months.mean_response_times_2
```