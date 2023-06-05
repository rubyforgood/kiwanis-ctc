import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import EditOrder from "../src/components/common/EditOrder";
import { Order } from "../src/types/Order";

describe("Test the EditOrder component", () => {
  
  // Test the rendering of the Table header
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
/*
  // Test the rendering of the Table header
  test("The table Nnumber column should render", () => {
    render(<Orders />);
    const numTest = screen.getAllByText("No.");
    expect(numTest).toBeDefined;
  });

    // Test the rendering of the FullName header
    test("The table full name column should render", () => {
      render(<Orders />);
      const FullNameTest = screen.getAllByText("Full name");
      expect(FullNameTest).toBeDefined;
    });

    // Test the rendering of the BoxesOrder header
    test("The table Boxes number column should render", () => {
      render(<Orders />);
      const BoxesOrderTest = screen.getAllByText("Boxes Order");
      expect(BoxesOrderTest).toBeDefined;
    });

    // Test the rendering of the Paid header
    test("The table Paid column should render", () => {
      render(<Orders />);
      const PaidTest = screen.getAllByText("Paid");
      expect(PaidTest).toBeDefined;
    });

    // Test the rendering of the Status header
    test("The table Status column should render", () => {
      render(<Orders />);
      const PaidTest = screen.getAllByText("Status");
      expect(PaidTest).toBeDefined;
    });

    // Test the rendering of the Action header
    test("The table Action column should render", () => {
      render(<Orders />);
      const ActionTest = screen.getAllByText("Action");
      expect(ActionTest).toBeDefined;
    });*/

});
