import React, { Component } from 'react'
import './App.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CsvDownloader from 'react-csv-downloader';


export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currency: 'AUD',
      dataFrom: '',
      dataTo: '',
      startDate: new Date(),
      endDate: new Date(),
      bom: false,
      isLoaded: false,
      currenciesData: [],
      startValue: '',
      endValue: '',
      courseChanged: '',
      nameError: false,
      xmlData: [],
    }

    this.startingDateChangeHandler = this.startingDateChangeHandler.bind(this);
    this.endingDateChangeHandler = this.endingDateChangeHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.currencyCourseChanged = this.currencyCourseChanged.bind(this);
    this.dataFromXml = this.dataFromXml.bind(this);

  }

  componentDidMount() {
    this.startingDateChangeHandler(this.state.startDate);
    this.endingDateChangeHandler(this.state.endDate);
    this.loadData();
    this.dataFromXml();
  }

  currencyChecker() {
    let { currency } = this.state;
    currency = currency.toUpperCase();

    let allCurrencies = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK",
      "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK",
      "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RUB",
      "SEK", "SGD", "THB", "TRY", "USD", "ZAR"]
    if (currency === "") {
      this.setState({
        nameError: "Please fill currency blank!",

      })
    }

    else if (allCurrencies.includes(currency)) {
      this.setState({
        nameError: false,
        currency: currency
      })
      return true;
    }
    else {
      alert("Wrong input! Use USD as example")
      return false;
    }

  }

  dateFormater(date) {
    let formattedDate
    if (date != null) {
      if (date.getMonth() + 1 < 10 && date.getDate() < 10) {
        formattedDate = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-0" + date.getDate()

      }
      else if (date.getDate() < 10) {
        formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-0" + date.getDate()
      }
      else if (date.getMonth() + 1 < 10) {
        formattedDate = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate()
      }
      else {
        formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      }
      return formattedDate
    }
  }

  startingDateChangeHandler(startDate) {
    let formattedDate = this.dateFormater(startDate)
    this.setState({
      startDate: startDate,
      dataFrom: formattedDate,
    });
  }

  endingDateChangeHandler(endDate) {
    let formattedDate = this.dateFormater(endDate)
    this.setState({
      endDate: endDate,
      dataTo: formattedDate,
    });
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  currencyCourseChanged() {
    let responseDoc = new DOMParser().parseFromString(this.state.currenciesData, 'application/xml');
    let elements = responseDoc.getElementsByTagName('Amt').length;
    let startValue = responseDoc.getElementsByTagName('Amt')[1].textContent;
    let endValue = responseDoc.getElementsByTagName('Amt')[elements - 1].textContent;
    let changed = endValue - startValue;
    changed = changed.toFixed(5);
    this.setState({
      courseChanged: changed
    })
  }

  loadData() {
    if (this.currencyChecker() !== true) {
    }
    else {
      let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      let request = new Request(`https://lb.lt/webservices/FxRates/FxRates.asmx/getFxRatesForCurrency?tp=EU&ccy=${this.state.currency}&dtFrom=${this.state.dataFrom}&dtTo=${this.state.dataTo}`);
      let targetUrl = request.url;
      console.log(targetUrl)
      fetch(proxyUrl + targetUrl) // CORS
        .then(res => res.text())
        .then(
          result => {
            this.setState({
              isLoaded: true,
              currenciesData: result,
            });
            this.createTable();
            this.currencyCourseChanged();
            this.dataFromXml();
          },
          error => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.loadData();
  }

  createChangeTable = () => {
    if (this.state.isLoaded === true) {
      let table = [];
      let children = [];

      children.push(
        <tr key={0}>
          <td>{this.state.currency}</td>
          <td>{this.state.dataFrom}</td>
          <td>{this.state.dataTo}</td>
          <td>{this.state.courseChanged}</td>
        </tr>
      );

      table.push(<tbody key={0}>{children}</tbody>); // We create the parent tbody tags and add the inner loop (children).

      return table;
    }

  }

  dataFromXml() {
    if (this.state.isLoaded === true) {
      const data = [];
      let responseDoc = new DOMParser().parseFromString(this.state.currenciesData, 'application/xml');
      let elements = responseDoc.getElementsByTagName('Amt').length;

      for (let i = 1; i < elements; i = i + 2) {
        let number = i / 2;
        number = Math.floor(number)
        console.log(number)
        data.push({
          Valiuta: responseDoc.getElementsByTagName('Ccy')[i].textContent,
          Data: responseDoc.getElementsByTagName('Dt')[number].textContent,
          Santykis: responseDoc.getElementsByTagName('Amt')[i].textContent
        }
        );
      }
      this.setState({
        xmlData: data
      })
    }
  }

  createTable = () => {
    if (this.state.isLoaded === true) {
      const rates = this.state.currenciesData;
      let table = [];
      let children = [];

      let responseDoc = new DOMParser().parseFromString(rates, 'application/xml');
      let elements = responseDoc.getElementsByTagName('Amt').length;

      for (let i = 1; i < elements; i = i + 2) {
        let number = i / 2;
        number = Math.floor(number)
        children.push(
          <tr key={number}>
            <td>{responseDoc.getElementsByTagName('Ccy')[i].textContent}</td>
            <td>{responseDoc.getElementsByTagName('Dt')[number].textContent}</td>
            <td>{responseDoc.getElementsByTagName('Amt')[i].textContent}</td>
          </tr>
        );
      }

      table.push(<tbody key={0}>{children}</tbody>); // We create the parent tbody tags and add the inner loop (children).

      return table;
    }

  }

  render() {
    return (
      <div className="App-body">
        <div className="center">
          <div className="currency-form">
            <form className="" onSubmit={this.onSubmit.bind(this)}>
              <div className="input-field">
                <input
                  type="text"
                  name="currency"
                  value={this.state.currency}
                  onChange={this.handleChange}
                  placeholder="Valiutos pavadinimo santraupa"
                />
                <span className="help-is-danger">{this.state.nameError}</span>
              </div>
              <div className="input-field">
                <label>DATA NUO:</label>
                <DatePicker
                  dateFormat="yyyy-MM-dd"
                  selected={this.state.startDate}
                  onChange={this.startingDateChangeHandler}
                />
              </div>
              <div className="input-field">
                <label>DATA IKI:</label>
                <DatePicker
                  dateFormat="yyyy-MM-dd"
                  selected={this.state.endDate}
                  onChange={this.endingDateChangeHandler}
                />
              </div>
              <div className="get-currency-data-buttons">
                <button className="blue btn" type="submit" name="action"><i className="material-icons right">arrow_forward</i>Gauti duomenis</button>
              </div>
            </form>
            <div className="get-currency-data-buttons">
              <CsvDownloader bom={this.state.bom} datas={this.state.xmlData} filename="currency.csv">
                <button onClick={this.dataFromXml} type="submit" className="green btn-small"><i className="material-icons right">file_download</i>Atsisiųsti .CSV formatu</button>
              </CsvDownloader>
            </div>
          </div>
        </div>
        <div className="">
          <table className="currency-table">
            <thead>
              <tr>
                <th>Valiutos kodas</th>
                <th>Periodo pradžia</th>
                <th>Periodo pabaiga</th>
                <th>Pokytis</th>
              </tr>
            </thead>
            {this.createChangeTable()}
          </table>
          <table className="currency-table">
            <thead>
              <tr>
                <th>Valiutos kodas</th>
                <th>Data</th>
                <th>Santykis</th>
              </tr>
            </thead>
            {this.createTable()}
          </table>
        </div>
      </div>
    )
  }
}

export default App

