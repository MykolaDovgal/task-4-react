import React, {Component} from 'react';
import './Form.css';
import $ from 'jquery';

class Form extends Component {

	form_jquery;

	componentDidMount() {
		this.form_jquery = $('#form_task');
	}

	render() {
		return (
			<form action="#" id="form_task" onSubmit={this.handlerForForm}>
				<ul>
					<li>
						<label>Name<span className="required">*</span></label>
						<input onInput={this.handlerForInputs} minLength="1" datatype="Alpha" name="Name" type="text"
						       id="input_Name" required
						       className="field-long"
						       placeholder="Name"/>
						<span className="message_error"/>
					</li>
					<li>
						<label>Address ​ ​1 <span className="required">*</span></label>
						<input onInput={this.handlerForInputs} className="field-long" minLength="1"
						       datatype="Alphanumeric" name="Address_1" type="text"
						       id="input_Address_1"
						       placeholder="Address 1"
						       required/>
						<span className="message_error"/>
					</li>
					<li>
						<label>Address ​ ​2</label>
						<input onInput={this.handlerForInputs} className="field-long" minLength="1"
						       datatype="Alphanumeric" name="Address_2" type="text"
						       placeholder="Address 2"
						       id="input_Address_2"/>
						<span className="message_error"/>
					</li>

					<li>
						<label>​City<span className="required">*</span></label>
						<input className="field-long"
						       placeholder="​City"
						       onInput={this.handlerForInputs}
						       minLength="1" datatype="Alphanumeric" name="​City" type="text"
						       id="input_City" required
						/>
						<span className="message_error"/>
					</li>

					<li>
						<label>State</label>
						<select datatype="Alpha" name="State" id="input_State" required className="field-select">
							<option value="AL">Alabama</option>
							<option value="AK">Alaska</option>
							<option value="AZ">Arizona</option>
							<option value="AR">Arkansas</option>
							<option value="CA">California</option>
							<option value="CO">Colorado</option>
							<option value="CT">Connecticut</option>
							<option value="DE">Delaware</option>
							<option value="DC">District Of Columbia</option>
							<option value="FL">Florida</option>
							<option value="GA">Georgia</option>
							<option value="HI">Hawaii</option>
							<option value="ID">Idaho</option>
							<option value="IL">Illinois</option>
							<option value="IN">Indiana</option>
							<option value="IA">Iowa</option>
							<option value="KS">Kansas</option>
							<option value="KY">Kentucky</option>
							<option value="LA">Louisiana</option>
							<option value="ME">Maine</option>
							<option value="MD">Maryland</option>
							<option value="MA">Massachusetts</option>
							<option value="MI">Michigan</option>
							<option value="MN">Minnesota</option>
							<option value="MS">Mississippi</option>
							<option value="MO">Missouri</option>
							<option value="MT">Montana</option>
							<option value="NE">Nebraska</option>
							<option value="NV">Nevada</option>
							<option value="NH">New Hampshire</option>
							<option value="NJ">New Jersey</option>
							<option value="NM">New Mexico</option>
							<option value="NY">New York</option>
							<option value="NC">North Carolina</option>
							<option value="ND">North Dakota</option>
							<option value="OH">Ohio</option>
							<option value="OK">Oklahoma</option>
							<option value="OR">Oregon</option>
							<option value="PA">Pennsylvania</option>
							<option value="RI">Rhode Island</option>
							<option value="SC">South Carolina</option>
							<option value="SD">South Dakota</option>
							<option value="TN">Tennessee</option>
							<option value="TX">Texas</option>
							<option value="UT">Utah</option>
							<option value="VT">Vermont</option>
							<option value="VA">Virginia</option>
							<option value="WA">Washington</option>
							<option value="WV">West Virginia</option>
							<option value="WI">Wisconsin</option>
							<option value="WY">Wyoming</option>
						</select>
						<span className="message_error"/>
					</li>
					<li>
						<label>Zip​ ​Code<span className="required">*</span></label>
						<input datatype="Numeric" name="ZipCode" type="text"
						       placeholder="Zip​ ​Code"
						       maxLength="5" id="input_ZipCode"
						       onInput={this.handlerForInputs}
						       required className="field-long"/>
						<span className="message_error"/>
					</li>
					<li>
						<button onClick={this.handlerReset} id="reset_form_button" type="reset" form="form_task"
						        className="pull-left">Cancel
						</button>
						<button onClick={this.handlerForForm} id="submit_form_button" type="submit" form="form_task"
						        className="pull-right">OK
						</button>
					</li>
				</ul>
			</form>
		);
	}

	handlerForForm = (e) => {
		e.preventDefault();

		this.hideErrorMessages();

		const messages = {
			input_Name: "Check name",
			input_Address_1: "Check Address 1",
			input_Address_2: "Check Address 2",
			input_City: "Check City",
			input_State: "Check State",
			input_ZipCode: "Check Zip Code",
		};

		//console.log(e);
		let inputs = this.form_jquery.find('input, select');

		let check = true;
		let regexs = {
			'Alphanumeric': /^[a-z0-9]+$/i,
			'Alpha': /^[a-z]+$/i,
			'Numeric': /^[0-9]+$/
		};

		inputs.each((i, el) => {
			let j_object = $(el);
			let requireCheck = true;
			let typeCheck = true;
			let value = j_object.val();
			let id_element = j_object.attr('id');
			if (j_object.prop('required')) {
				if (value.length === 0) {
					requireCheck = false;
				}
			}

			let dataRegex = j_object.attr('datatype');
			const regex = regexs[dataRegex];
			if (!regex.test(value) && j_object.prop('required')) {
				typeCheck = false
			}

			if (!requireCheck || !typeCheck) {
				j_object.addClass('error');
				let message_error = j_object.next('.message_error');
				message_error.text(messages[id_element]).addClass('show');


				if (check) {
					check = false;
				}
			}
		});

		console.log('check', check);

		if (check) {
			this.form_jquery.submit();
		}
	};

	hideErrorMessages = () => {
		this.form_jquery.find('input, select, .message_error').removeClass('show').removeClass('show');
	};

	handlerForInputs = (e) => {
		const target = $(e.target);
		target.removeClass('error');
		target.next('.message_error').removeClass('show');
	};

	handlerReset = (e) => {
		e.preventDefault();
		this.form_jquery.get(0).reset();
		return false;
	}


}

export default Form;
