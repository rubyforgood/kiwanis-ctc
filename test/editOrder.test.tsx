import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import EditOrder from "../src/components/common/EditOrder";
import { Order } from "../src/types/Order";

describe("Test the EditOrder component", () => {
  
  // Test the rendering of edit order 
  it("The Order component should render and 'Category' should be displayed", () => {
    const orderInfo: Order = {
        id: "101",
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        cellPhone: '123-456-7890',
        homePhone: '987-654-3210',
        paid: false,
        pickedUp: false,
        boxesForAFAC: 201,
        boxesForCustomer: 10,
        customerComments: "Wow, this test is working",
        howDidYouHearAboutUs: "Through testing code",
        kiwanisMember: true,
        method: "the method is test",
        submissionDate: "June 05, 2023"
      };
      
    render(<EditOrder order={orderInfo}/>);
    const sc = screen.getByText("Category");
    expect(sc).toBeDefined();
  });

  // Test the rendering of edit order 
  it("The Order component should render and firstName should be displayed", () => {
    const orderInfo: Order = {
        id: "101",
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        cellPhone: '123-456-7890',
        homePhone: '987-654-3210',
        paid: false,
        pickedUp: false,
        boxesForAFAC: 201,
        boxesForCustomer: 10,
        customerComments: "Wow, this test is working",
        howDidYouHearAboutUs: "Through testing code",
        kiwanisMember: true,
        method: "Credit card",
        submissionDate: "June 05, 2023"
      };
      
    render(<EditOrder order={orderInfo}/>);
    const sc = screen.getByText("John");
    expect(sc).toBeDefined();
  });
  
  // Test the rendering of edit order 
  it("The Order component should render and payment detail should be displayed", () => {
    const orderInfo: Order = {
        id: "101",
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        cellPhone: '123-456-7890',
        homePhone: '987-654-3210',
        paid: false,
        pickedUp: false,
        boxesForAFAC: 201,
        boxesForCustomer: 10,
        customerComments: "Wow, this test is working",
        howDidYouHearAboutUs: "Through testing code",
        kiwanisMember: true,
        method: "Credit card",
        submissionDate: "June 05, 2023"
      };
      
    render(<EditOrder order={orderInfo}/>);
    const sc = screen.getByText("Credit card");
    expect(sc).toBeDefined();
  });

  // Test the rendering of edit order 
  it("The Order component should render and for paid 'No' should be displayed", () => {
    const orderInfo: Order = {
        id: "101",
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        cellPhone: '123-456-7890',
        homePhone: '987-654-3210',
        paid: false,
        pickedUp: false,
        boxesForAFAC: 201,
        boxesForCustomer: 10,
        customerComments: "Wow, this test is working",
        howDidYouHearAboutUs: "Through testing code",
        kiwanisMember: true,
        method: "Credit card",
        submissionDate: "June 05, 2023"
      };
      
    render(<EditOrder order={orderInfo}/>);
    const sc = screen.getByText("Yes");
    expect(sc).toBeDefined();
  });

});
