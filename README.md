# react-hooks-binding

React hooks binding is manage states and context like redux just more simple.

## Features:

Binding to relative DataContext.
Binding to global DataContext.
Binding Source - default is the relative DataContext, which can be Binding or DataContext.
Binding contextKey - set the source to global DataContext by key value.
Binding Mode - three modes for binding oneWay, twoWay, oneWayToSource.
Binding Path - the path to the binding source property.
Binding convert - way to adjust the real value.
Binding convertBack - way to convert back to real value.  
MultiBinding - from multiple sources to one value.

Typescript definitions

## Installation

```
npm install react-hooks-binding --save
```

## Basic Usage

Wrap your form with DataContext and then useBinding in every place you need to get or set value from DataContext.

## Example:

```
import { DataContextProvider } from 'react-hooks-binding';

<DataContextProvider
  context={{
    payment: {
      cardNumber: '',
      expiry: '',
      cardCode: ''
    }
  }}
>
  <PaymentView />
</DataContextProvider>;

export default function PaymentView() {
  return (
    <>
      <CardNumber />
      <CardExpiry />
      <CardCode />
    </>
  );
}

import { useBinding, BindingMode } from 'react-hooks-binding/build';

export default function CardNumber() {
  let cardNumberBinding = useBinding({
    path: 'payment.cardNumber',
    mode: BindingMode.twoWay,
    convert: value => {
      let formated = payment.fns.formatCardNumber(value);
      return formated;
    },
    convertBack: (source, value) => {
      let cardNumber = string(value).replaceAll(' ', '').s;
      return cardNumber;
    }
  });

  return (
    <TextInput
      value={cardNumberBinding.value}
      onChangeText={rawCardNumber => {
        cardNumberBinding.setValue(rawCardNumber);
      }}
    />
  );
}
```
