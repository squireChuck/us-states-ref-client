var StateInfoRow = React.createClass({
	render: function () {
		/*jshint ignore:start */
		return (
			<tr>
				<td>{this.props.label}</td>
				<td>{this.props.children}</td>
			</tr>
		);
		/*jshint ignore:end */
	}
});

var StateTable = React.createClass({
	render: function () {
		var stateRows = [];

		// Display info that hasn't been hidden by the user.
		if (this.props.hideOtherInfo !== true) {
			/*jshint ignore:start */
			stateRows.push(<StateInfoRow label="Capital">{this.props.capital}</StateInfoRow>);
			/*jshint ignore:end */
		}

		if (this.props.hideLicenseInfo !== true) {
			/*jshint ignore:start */
			stateRows.push(
				<StateInfoRow label="Driver's License Format">{this.props.driversLicenseDescription}</StateInfoRow>,
				<StateInfoRow label="License">{this.props.sampleLicense}</StateInfoRow>);
			/*jshint ignore:end */
		}

		this.props.addresses.forEach(function (address) {
			if (this.props.hideAddressInfo === true) {
				return;
			} else {
				/*jshint ignore:start */
				stateRows.push(<StateInfoRow label="Address">{address.street}<br />{address.city}, {address.state} {address.zip}</StateInfoRow>);
				/*jshint ignore:end */
			}
		}.bind(this));

		/*jshint ignore:start */
		return (
			<table className="state-table">
				<thead>
					<th colspan="2">{this.props.name} - {this.props.abbrev}</th>
				</thead>
				<tbody>
					{stateRows}
				</tbody>
			</table>
		);
		/*jshint ignore:end */
	}
});

var StateTables = React.createClass({
	render: function () {
		var stateTables = this.props.states.map(function (state) {
			if (state.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 &&
				state.abbrev.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
				return;
			}

			/*jshint ignore:start */
			return (
				<StateTable
					name={state.name} 
					abbrev={state.abbrev} 
					capital={state.capital}
					addresses={state.addresses} 
					driversLicenseDescription={state.driversLicenseDescription}
					sampleLicense={state.sampleLicense}
					hideAddressInfo={this.props.hideAddressInfo}
					hideLicenseInfo={this.props.hideLicenseInfo}
					hideOtherInfo={this.props.hideOtherInfo} >
				</StateTable>
			);
			/*jshint ignore:end */
		}.bind(this));

		/*jshint ignore:start */
		return (
			<div className="states">
				{stateTables}
			</div>
		);
		/*jshint ignore:end */
	}
});

var SearchBar = React.createClass({
	handleChange: function () {
		this.props.onUserInput(
			this.refs.filterTextInput.value,
			this.refs.hideAddressInfo.checked,
			this.refs.hideLicenseInfo.checked,
			this.refs.hideOtherInfo.checked
		);
	},
	render: function () {
		/*jshint ignore:start */
		return (
			<form>
				<input className="search-box"
					type="text"
					placeholder="Search..."
					value={this.props.filterText}
					ref="filterTextInput"
					onChange={this.handleChange} />

				<section className="display-info">
					<h3>Hide Information:</h3>

					<div className="info-list">
						<div className="info-item">
							<input className="info-item-selection" 
								type="checkbox"
								checked={this.props.hideAddressInfo}
								ref="hideAddressInfo"
								onChange={this.handleChange} />&nbsp;
								<span className="info-item-text">Address</span>
						</div>
						<div className="info-item">
							<input className="info-item-selection" 
								type="checkbox"
								checked={this.props.hideLicenseInfo}
								ref="hideLicenseInfo"
								onChange={this.handleChange} />&nbsp;
								<span className="info-item-text">License</span>
						</div>
						<div className="info-item">
							<input className="info-item-selection" 
								type="checkbox"
								checked={this.props.hideOtherInfo}
								ref="hideOtherInfo"
								onChange={this.handleChange} />&nbsp;
								<span className="info-item-text">Additional</span>
						</div>
					</div>
				</section>
			</form>
		);
		/*jshint ignore:end */
	}
});

var FilterableStateTables = React.createClass({
	getInitialState: function () {
		return {
			data: [],
			filterText: '',
			hideAddressInfo: false,
			hideLicenseInfo: false,
			hideOtherInfo: false
		};
	},
	handleUserInput: function (filterText, hideAddressInfo, hideLicenseInfo, hideOtherInfo) {
		this.setState({
			filterText: filterText,
			hideAddressInfo: hideAddressInfo,
			hideLicenseInfo: hideLicenseInfo,
			hideOtherInfo: hideOtherInfo
		});
	},
	componentDidMount: function () {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function (data) {
				this.setState({ data: data });
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	render: function () {
		/*jshint ignore:start */
		return (
			<div>
				<SearchBar
					filterText={this.state.filterText}
					hideAddressInfo={this.state.hideAddressInfo}
					hideLicenseInfo={this.state.hideLicenseInfo}
					hideOtherInfo={this.state.hideOtherInfo}
					onUserInput={this.handleUserInput}
					/>
				<StateTables
					states={this.state.data}
					filterText={this.state.filterText}
					hideAddressInfo={this.state.hideAddressInfo}
					hideLicenseInfo={this.state.hideLicenseInfo}
					hideOtherInfo={this.state.hideOtherInfo}
					/>
			</div>
		);
		/*jshint ignore:end */
	}
});

/*jshint ignore:start */
ReactDOM.render(
	<FilterableStateTables url="/usstates/api/v1/states" />,
	document.getElementById('container')
);
/*jshint ignore:end */