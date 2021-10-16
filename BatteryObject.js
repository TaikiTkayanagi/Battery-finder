class BatteryObject{
  constructor(batteryName, capacityAh, voltage, maxDraw, endVoltage){
    this.batteryName = batteryName;
    this.capacityAh = capacityAh;
    this.voltage = voltage;
    this.maxDraw = maxDraw;
    this.endVoltage = endVoltage;
  }

  getPowerCapacity(){
    return this.capacityAh * this.voltage;
  }

  getElectricPower(){
    return this.endVoltage * this.maxDraw;
  }

  getSustainableHour(powerConsumptionW){
    let powerCapacity = this.getPowerCapacity();
    return Math.round(powerCapacity / powerConsumptionW * 10) / 10;
  }
}
