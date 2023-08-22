# Project Setup and Testing Guide

Welcome! This guide will walk you through the process of setting up the project and testing the application.

## Setting Up

### 1. Clone the Repository

To get started, you'll first need to clone the repository:

```bash
git clone [repository-url]   # Replace [repository-url] with the actual repo link.
```

### 2. Install Dependencies

Once cloned, navigate to the project directory and run:

```bash
npm install
```

### 3. Start the Development Server

You can start the dev server using one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Testing the Application

We've created two GoerliETH coins for application testing via [Remix Ethereum](https://remix.ethereum.org/#lang=en&optimize=false&runs=200&evmVersion=null):

1. [Vik Coin](https://goerli.etherscan.io/address/0xF0A920FF433751497b26ca4b528fD9472cA133D0)
2. [Eunna Coin](https://goerli.etherscan.io/address/0x6EC23DbA39F0531B64611F984a73FCa080932BB7)

To work and test these coin transfers:

1. Visit [Goerli Faucet](https://goerlifaucet.com/).
2. Add your address.
3. Request the faucet to send some tokens to your address.

> **Note:** This application exclusively uses the Goerli provider. No other providers are supplied for different chains. Ensure you're testing on the Goerli network.

Upon logging into the app, you will notice two **ERC20 coins**:

1. **Vik Coin**
2. **Eunna Coin**

## Architecture Details

- **State Management:** The application leverages [Zustand](https://github.com/pmndrs/zustand) for global state management. It offers a reduced amount of boilerplate compared to other state management tools like Redux or Recoil. We chose not to employ react-query since wagmi js met most of our requirements.

- **Business Logic:** All business logic can be found within custom hooks in the `hooks` folder. Organizing logic in this manner simplifies maintenance, facilitates logic reuse, and is advantageous for unit testing. However, please note that no test cases have been written as of now. Despite this, the operational business design allows for simpler test case and E2E test case composition.

- **Design:** The app's aesthetics have been enhanced using [Tailwind CSS](https://tailwindcss.com/).

Happy coding and testing! If you encounter any issues or have feedback, please feel free to raise them in the repository's issues section.
