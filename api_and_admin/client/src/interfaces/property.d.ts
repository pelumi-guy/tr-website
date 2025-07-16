import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    propertyType: string,
    location: string,
    price: number | undefined,
}

export interface PropertyCardProps {
  id?: BaseKey | undefined,
  title: string,
  location: Location,
  price: string,
  photos: Array<string>,
}


export interface Location {
  city: string,
  country: string,
  state: string,
  street: string
}

export interface Price {
  amount: string,
  currency: string
}