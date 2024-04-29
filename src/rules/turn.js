export class TurnTrack {
  #days = days
  #hours = hours

  constructor(day, hour) {
    this.day = day ?? 0
    this.hour = hour ?? 15
  }

  get label() {
    return `${this.#days[this.day]} ${this.#hours[this.hour].hour}`
  }

  get isStragglerRecovery() {
    return this.#hours[this.hour].hour.endsWith('00')
  }

  nextTurn() {
    this.hour++
    if (this.hour >= this.#hours.length) {
      this.hour = 0
      this.day++
    }
  }
}

export const days = [
  'June 26th, 1862',
  'June 27th, 1862',
  'June 28th, 1862',
  'June 29th, 1862',
  'June 30th, 1862',
  'July 1st, 1862'
]
export const hours = [
  { hour: '12:00 am', visibility: 2 },
  { hour: '1:00 am', visibility: 2 },
  { hour: '2:00 am', visibility: 2 },
  { hour: '3:00 am', visibility: 2 },
  { hour: '4:00 am', visibility: 2 },
  { hour: '5:00 am', visibility: 3 },
  { hour: '5:30 am', visibility: 8 },
  { hour: '6:00 am', visibility: 99 },
  { hour: '6:30 am', visibility: 99 },
  { hour: '7:00 am', visibility: 99 },
  { hour: '7:30 am', visibility: 99 },
  { hour: '8:00 am', visibility: 99 },
  { hour: '8:30 am', visibility: 99 },
  { hour: '9:00 am', visibility: 99 },
  { hour: '9:30 am', visibility: 99 },
  { hour: '10:00 am', visibility: 99 },
  { hour: '10:30 am', visibility: 99 },
  { hour: '11:00 am', visibility: 99 },
  { hour: '11:30 am', visibility: 99 },
  { hour: '12:00 pm', visibility: 99 },
  { hour: '12:30 pm', visibility: 99 },
  { hour: '1:00 pm', visibility: 99 },
  { hour: '1:30 pm', visibility: 99 },
  { hour: '2:00 pm', visibility: 99 },
  { hour: '2:30 pm', visibility: 99 },
  { hour: '3:00 pm', visibility: 99 },
  { hour: '3:30 pm', visibility: 99 },
  { hour: '4:00 pm', visibility: 99 },
  { hour: '4:30 pm', visibility: 99 },
  { hour: '5:00 pm', visibility: 99 },
  { hour: '5:30 pm', visibility: 99 },
  { hour: '6:00 pm', visibility: 99 },
  { hour: '6:30 pm', visibility: 99 },
  { hour: '7:00 pm', visibility: 99 },
  { hour: '7:30 pm', visibility: 8 },
  { hour: '8:00 pm', visibility: 3 },
  { hour: '9:00 pm', visibility: 2 },
  { hour: '10:00 pm', visibility: 2 },
  { hour: '11:00 pm', visibility: 2 }
]
