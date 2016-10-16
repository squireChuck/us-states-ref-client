var StateInfoRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.label}</td>
        <td>{this.props.children}</td>
      </tr>
    );
  }
});

var StateTable = React.createClass({
  render: function() {
    var addressRows = this.props.addresses.map(function(address) {
      if (this.props.hideAddressInfo === true) {
        return;
      } else {
        return (
          <StateInfoRow label="Sample Address">{address.street}<br />{address.city}, {address.state} {address.zip}</StateInfoRow>
        );
      }
    }.bind(this));

    var headerStyle = {
      borderBottom: '1px solid black'
    };
    return (
      <table>
        <thead>
          <tr>
            <th style={headerStyle} colspan="2">{this.props.name} - {this.props.abbrev}</th>
          </tr>
        </thead>
        <tbody>
          <StateInfoRow label="Capital">{this.props.capital}</StateInfoRow>  
          <StateInfoRow label="Driver's License Format">{this.props.driversLicenseDescription}</StateInfoRow>
          <StateInfoRow label="Sample License">{this.props.sampleLicense}</StateInfoRow>      
          {addressRows}  
        </tbody>
      </table>
    );
  }
});

var StateTables = React.createClass({
  render: function() {
    var hideAddressInfo = this.props.hideAddressInfo;
    var filterText = this.props.filterText;
    var stateTables = this.props.states.map(function(state) {
      if (state.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1 && 
          state.abbrev.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      }
      return (
      <StateTable name={state.name} abbrev={state.abbrev} capital={state.capital} addresses={state.addresses} 
                    driversLicenseDescription={state.driversLicenseDescription} sampleLicense={state.sampleLicense} 
                    hideAddressInfo={hideAddressInfo}>
      </StateTable>
      );
    });
    return (
      <div className="stateTables">
        {stateTables}
      </div>
    );
  }
});

// Hide license info, hide basic/misc info...?
// That'd be good for reconstructing the original lists.
var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.hideAddressInfo.checked
    );
  },  
  render: function() {
    return (
      <form>
        <input type="text" 
                placeholder="Search..." 
                value={this.props.filterText} 
                ref="filterTextInput"
                onChange={this.handleChange}/>
        <p>
        <input type="checkbox" 
                checked={this.props.hideAddressInfo} 
                ref="hideAddressInfo"
                onChange={this.handleChange}
                />
        {' '}
        Hide address info
        </p>
      </form>
    );
  }
});

var FilterableStateTables = React.createClass({
  getInitialState: function() {
    return {
      data: [], 
      filterText: '',
      hideAddressInfo: false
    };
  },
  handleUserInput: function(filterText, hideAddressInfo) {
    this.setState({
      filterText: filterText,
      hideAddressInfo: hideAddressInfo
    })
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div>
        <SearchBar 
          filterText={this.state.filterText}
          hideAddressInfo={this.state.hideAddressInfo}
          onUserInput={this.handleUserInput}
        />
        <StateTables 
          states={this.state.data} 
          filterText={this.state.filterText}
          hideAddressInfo={this.state.hideAddressInfo}
        />
      </div>
    );
  }
});

ReactDOM.render(
  <FilterableStateTables url="/app/api/v1/states" />,
  document.getElementById('container')
);