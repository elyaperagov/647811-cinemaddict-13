import Smart from "../view/smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import isToday from 'date-fns/is_today';
import isThisWeek from 'date-fns/is_this_week';
import isThisMonth from 'date-fns/is_this_month';
import isThisYear from 'date-fns/is_this_year';
import {BAR_HEIGHT, statsPeriod} from "../constants.js";
import {calculateMoviesDuration, getStatistics, getGenres, getUserRank} from "../helpers/statistics-helpers.js";

const renderChart = (statisticCtx, dataLabels, dataValues) => {
  statisticCtx.height = BAR_HEIGHT * 10;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: dataLabels,
      datasets: [{
        data: dataValues,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticsTemplate = (films, period, rank) => {
  const totalDuration = calculateMoviesDuration(films);
  const {topGenre} = getStatistics(films);
  getGenres(films);

  return (`<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${period === statsPeriod.ALL_TIME ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${period === statsPeriod.TODAY ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${period === statsPeriod.WEEK ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${period === statsPeriod.MONTH ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${period === statsPeriod.YEAR ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${films.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDuration.hours} <span class="statistic__item-description">h</span> ${totalDuration.minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`);
};

export default class Statistics extends Smart {
  constructor(data) {
    super();
    this._films = data.filter((film) => film.isWatched);
    this._filmsByPeriod = this._films;
    this._period = statsPeriod.ALL_TIME;
    this._statisticsChangeHandler = this._statisticsChangeHandler.bind(this);
    this._setChart();
    this._setStatisticsChangeHandler();
  }

  _statisticsChangeHandler(evt) {
    evt.preventDefault();
    this._period = evt.target.value;
    this._getStatisticFromPeriod();
    this.updateData(this._filmsByPeriod);
  }

  _setStatisticsChangeHandler() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, this._statisticsChangeHandler);
  }

  _getStatisticFromPeriod() {
    switch (this._period) {
      case statsPeriod.ALL_TIME:
        this._filmsByPeriod = this._films;
        break;
      case statsPeriod.TODAY:
        this._filmsByPeriod = this._films.filter((item) => isToday(item.watchingDate));
        break;
      case statsPeriod.WEEK:
        this._filmsByPeriod = this._films.filter((item) => isThisWeek(item.watchingDate));
        break;
      case statsPeriod.MONTH:
        this._filmsByPeriod = this._films.filter((item) => isThisMonth(item.watchingDate));
        break;
      case statsPeriod.YEAR:
        this._filmsByPeriod = this._films.filter((item) => isThisYear(item.watchingDate));
        break;
    }
  }

  _setChart() {
    this._rank = getUserRank(this._films);
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    const {genresLabels, genresValues} = getStatistics(this._filmsByPeriod);
    renderChart(statisticCtx, genresLabels, genresValues);
  }

  getTemplate() {
    return createStatisticsTemplate(this._filmsByPeriod, this._period, this._rank);
  }

  restoreHandlers() {
    this._setChart();
    this._setStatisticsChangeHandler();
  }
}
