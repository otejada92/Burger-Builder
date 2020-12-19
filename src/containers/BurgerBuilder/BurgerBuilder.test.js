import React from 'react';
import { configure, shallow }from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildsControls';


configure({adapter: new Adapter()});

describe('<BurgerBuilder/>', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    });

    it('should render two <BurgerBuilder /> elements if not authenticated', () => {
        wrapper.setProps({ingredients: {salad : 0}});
        expect(wrapper.find(<BuildControls/>));
    });
});