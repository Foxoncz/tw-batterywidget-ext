TW.Runtime.Widgets.battery = function () {
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

	// this is called on your widget anytime bound data changes
	this.updateProperty = function (updatePropertyInfo) {
		// TargetProperty tells you which of your bound properties changed
		if (updatePropertyInfo.TargetProperty === 'Level') {
			var value = updatePropertyInfo.SinglePropertyValue;
			this.battery.state(this.getProperty('Level'));
			this.setProperty(updatePropertyInfo.TargetProperty, value);
		}
		
		else if (updatePropertyInfo.TargetProperty === 'Inverse') {
			var value = (updatePropertyInfo.SinglePropertyValue == "true");
			this.battery.colorfull(this.getProperty('Inverse'));
			this.setProperty(updatePropertyInfo.TargetProperty, value);
		}
		
		else if (updatePropertyInfo.TargetProperty === 'Charging') {
			var value = (updatePropertyInfo.SinglePropertyValue == "true");
			this.semaphore.charging(this.getProperty('Charging'));
			this.setProperty(updatePropertyInfo.TargetProperty, value);
		}
		
		else if (updatePropertyInfo.TargetProperty === 'Error') {
			var value = (updatePropertyInfo.SinglePropertyValue == "true");
			this.semaphore.error(this.getProperty('Error'));
			this.setProperty(updatePropertyInfo.TargetProperty, value);
		}
		
		else if (updatePropertyInfo.TargetProperty === 'Full') {
			var value = (updatePropertyInfo.SinglePropertyValue == "true");
			this.semaphore.full(this.getProperty('Full'));
			this.setProperty(updatePropertyInfo.TargetProperty, value);
		}
	};
};