import React from "react";
import { configure, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";


configure({ adapter: new Adapter() });


describe('<RecipeCreate/>', () => {

   describe('Estructura', () => {
      let wrapper;
      beforeEach(() => {
         wrapper = shallow(<RecipeCreate/>)
      })
   })

     it('Debe renderizar un formulario', () => {
        expect(wrapper.find('form').toHaveLenght(1));
     });

     it('Debe renderizar un label para el nombre con el texto "Name:"', () => {
        expect(wrapper.find('label').at(0).text()).toEqual('Name:');
     });

     it('Debe renderizar un input para con la propiedad "name" igual a "name', () => {
        expect(wrapper.find('input[name="name"]').toHaveLenght(1));
     });

     it('Debe renderizar un label para el summary con el texto "Sumarry:', () => {
        expect(wrapper.find('label').at(1).text()).toEqual('Sumarry:');
     });

     it('Debe renderizar un input de tipo número para con la propiedad "name" igual a "summary"', () => {
        expect(wrapper.find('input[name="summary"]').toHaveLenght(1));
        expect(wrapper.find('input[type="number"]').toHaveLenght(2));
     });
     it('Debe renderizar un label para la descripción con el texto "Health Score:', () => {
        expect(wrapper.find('label').at(2).text()).toEqual('Health Score:');
     });
     it('Debe renderizar un input con la propiedad "name" igual a "HealthScore"', () => {
        expect(wrapper.find('input[name="healthScore"]').toHaveLenght(1));
     });

     it('Debe renderizar in label para los steps con el texto "Steps: "', () => {
        expect(wrapper.find('label').at(3).text()).toEqual('Steps: ');
     });
     it('Debe renderizar un input de tipo number para con la propiedad "name" igual a "steps', () => {
        expect(wrapper.find('input[name="steps"]').length).toEqual(1);
        expect(wrapper.find('input[type="text"]').length).toEqual(2);
     });

     it('Debería renderizar un input de button submit y con texto "Create Recipe"', () => {
        expect(wrapper.find('button[type="submit"]').length).toEqual(1);
        expect(wrapper.find('button[type="submit"]').text()).toEqual('Create Recipe');
     });
  });
// });
