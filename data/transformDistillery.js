import days from 'days';

type DistilleryHours = {
  monday_open: string,
  monday_close: string,
  tuesday_open: string,
  tuesday_close: string,
  wednesday_open: string,
  wednesday_close: string,
  thursday_open: string,
  thursday_close: string,
  friday_open: string,
  friday_close: string,
  saturday_open: string,
  saturday_close: string,
  sunday_open: string,
  sunday_close: string,
}

type DistilleryData = {
  accentColor?: string,
  address: string,
  city: string,
  color?: string,
  description: string,
  hours: DistilleryHours,
  id: number,
  latitude: string,
  logo: string,
  logo_small: string,
  longitude: string,
  postal_code: string,
  social_instagram: string,
  summary?: ?string,
  title: string,
}

export default function transformDistillery(distillery: DistilleryData, currentDate = new Date()): any {
  let { hours } = distillery;
  let day = days[currentDate.getDay()];
  let currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:00`;
  let openingTimeToday = hours[`${day.toLowerCase()}_open`];
  let closingTimeToday = hours[`${day.toLowerCase()}_close`];

  let isOpeningLater = currentTime < openingTimeToday;

  let isOpen = (
    (currentTime > openingTimeToday) &&
    (currentTime < closingTimeToday || closingTimeToday === '00:00:00')
  ) || (
    (closingTimeToday < openingTimeToday) &&
    (currentTime > openingTimeToday)
  );

  return {
    accentColor: distillery.accentColor || '#000',
    address: distillery.address,
    city: distillery.city,
    closingTimeToday,
    color: distillery.color || '#fff',
    description: distillery.description,
    hours: distillery.hours,
    id: distillery.id,
    instagram: distillery.social_instagram,
    isOpen,
    isOpeningLater,
    latitude: parseFloat(distillery.latitude),
    logo: distillery.logo,
    longitude: parseFloat(distillery.longitude),
    name: distillery.title,
    openingTimeToday,
    postalCode: distillery.postal_code.split(' ').join('').toUpperCase(),
    smallLogo: distillery.logo_small,
    summary: distillery.summary,
  };
}
