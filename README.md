## How to operate this crawler.

1. Start babel watchers.

```
    npm run watch
```

2. Start mongodb.

```
    # systemctl start mongodb.service
```

3. Start the server.

```
    npm run start
```

Make sure that `src/app.js` has `crawler()` uncommented and `rollIt`
commented.

## Crawler principles.

*It's a bit messy.*

* The mainLink variable has the yearly results links. The `crawler` *from
  crawler dir* takes that and checks if that year's results are in our
  raw-data databases with `checkResultsExistance`.

* `checkResultsExistance` gets the mainLink, extracts info (examType
  & year) from the url using `extractFromUrl` function and then passes the
  object to `getSchools` *from db/tasks.js* which uses the categories to
  get the saved schools from db and returns the array of saved schools.


# Current year results aren't saved yet, case.

* `checkResultsExistance` will return the saved schools if found if not
  it'll return [] (empty array) then the `runner` function *which is
  called the crawler in app.js* will then proceed with `rollerCoaster`
  function which takes the that link and sends `GET` requests to all
  schools in that year (all results) then wait for them to resolve in
  chronological order with `getSchoolsLink`.

* `getSchoolsLink` returns each opened page link ready for **Crawling** and
  then with a series of Holy fucking Promises we give the links to
  `getResultsPromises` which needs it's own section.

**getResultsPromises 's section**

We start by mapping the links given by every `Get` request we sent
& received a page link.

We map and in every page link we pass `getResults` function which does the
crawling by using jsdom & jquery libray. Then the crawler uses jsdom
& jquery to request & crawl that page with data found in `./lib` *relative
path to the crawler dir*.

This returns an array of promises of the parsed/crawled data , ready to be
saved into db back to `rollerCoaster` so it can make the saving logic.

**rollerCoaster**

RollerCoaster gets the results promised array, pass through each by using
a reducer function with `Promise.resolve()` as an accumulator and goes on
with the rest of data saving as the wheel revolve using `saveResults`
& Promise structures.

# Current year results are available.

In this case `checkResultsExistance` didn't return empty array but and
array of schools meaning some schools were saved.

– This was important due to network errors that happened during the
crawling leading to partial saving of the data.

It will start by printing "No overwriting" then goes on to
`processPartialResults` which will take links again and compare which
schools are saved on database and which aren't by using `compareLinks`
then start processing again all none existing results in the database with
`rollerCoaster` function.


# There existed a network error while crawling

More than once there exists a network error somewhere while crawling and
some data will end up missing or partial none efficient data to counteract
this I added `networkErrorMsg` which is a way of informing the runner
where the error happened and the program to retry the `GET` requests and
make sure the data is consistent.

Most process in here are a repitition of the `processPartialResults` with
some justification but following up with the code will give you a good
insight.

# Finishing words on the crawler.

There is a lot of handling I did not talk about. The data is very
inconsistent so there is a lot of if-s and checking which kind of data are
we dealing with.

I cannot address the issues in a README because first, that's not how we
explain a program, also, that is also handled in section two
**Standardizing the data.**

## Goodluck Ano!
