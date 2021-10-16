class CameraObject{
  constructor(brand, model, powerConsumptionWh){
    this.brand = brand;
    this.model = model;
    this.powerConsumptionWh = powerConsumptionWh;
  }

  getBrand(){
    return this.brand;
  }

  getModel(){
    return this.model;
  }

  getPowerConsumptionWh(){
    return this.powerConsumptionWh;
  }
}
