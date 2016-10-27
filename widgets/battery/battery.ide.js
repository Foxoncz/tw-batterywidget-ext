TW.IDE.Widgets.battery = function () {
	this.widgetIconUrl = function() {
		return  "'../Common/extensions/BatteryWidget/ui/battery/battery.png'";
	};

	this.widgetProperties = function () {
		return {
			'name': 'Battery',
			'description': 'Simple battery widget.',
			'category': ['Common'],
			'properties': {
				'Level': {
					'baseType': 'NUMBER',
					'defaultValue': 0,
					'isBindingTarget': true
				},
				'Inverse': {
					'baseType': 'BOOLEAN',
					'defaultValue': false,
					'isBindingTarget': true
				},
				'Charging': {
					'baseType': 'BOOLEAN',
					'defaultValue': false,
					'isBindingTarget': true
				},
				'Full': {
					'baseType': 'BOOLEAN',
					'defaultValue': false,
					'isBindingTarget': true
				},
				'Error': {
					'baseType': 'BOOLEAN',
					'defaultValue': false,
					'isBindingTarget': true
				},
				'Width': {
                    'description': 'Widget width',
                    'defaultValue': 50
                },
                'Height': {
                    'description': 'Widget height',
                    'defaultValue': 100
                }

			}
		}
	};

	this.afterSetProperty = function (name, value) {
		var refreshHtml = false;
		switch (name) {
			case 'Level':
				this.battery.level(value);
				break;
			case 'Charging':
				this.battery.charging(value);
				break;
			case 'Error':
				this.battery.error(value);
				break;
			case 'Full':
				this.battery.full(value);
				break;
			case 'Inverse':
				this.battery.inverse(value);
				break;
			default:
				break;
		}
		return refreshHtml;
	};

	this.renderHtml = function () {
		// return any HTML you want rendered for your widget
		// If you want it to change depending on properties that the user
		// has set, you can use this.getProperty(propertyName).
		// return any HTML you want rendered for your widget
		var script = '<script src="../Common/extensions/BatteryWidget/ui/battery/battery.js" type="text/javascript"></script>';
		var html = '<div class="widget-content widget-battery">' +
						'<div class="battery-wrapper">' +
						  '<div class="battery">' +
							'<div class="bar"></div>' +
							'<div class="bar"></div>' +
							'<div class="bar"></div>' +
							'<div class="bar"></div>' +
							'<div class="bar"></div>' +
						  '</div>' +
						'</div>' +
					'</div>';
				
		if (jQuery().battery){
			return html;
		}
		else {
			return script + html;
		}
	};

	this.afterRender = function () {
		this.battery = this.jqElement.battery();
		this.battery.level(this.getProperty('Level'));
		this.battery.inverse(this.getProperty('Inverse'));
		this.battery.charging(this.getProperty('Charging'));
		this.battery.error(this.getProperty('Error'));
		this.battery.full(this.getProperty('Full'));
	};

};