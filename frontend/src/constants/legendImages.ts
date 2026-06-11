/** 전설의 명당 선수 사진 — public/legends/ 로컬 에셋 */
export const LEGEND_IMAGES: Record<string, string> = {
    'Ryan Giggs': '/legends/ryan-giggs.jpg',
    'Bobby Charlton': '/legends/bobby-charlton.jpg',
    'Bill Foulkes': '/legends/bill-foulkes.png',
    'Paul Scholes': '/legends/paul-scholes.jpg',
    'Gary Neville': '/legends/gary-neville.jpg',
    'Alex Stepney': '/legends/alex-stepney.jpg',
    'Tony Dunne': '/legends/tony-dunne.svg',
    'Denis Irwin': '/legends/denis-irwin.jpg',
    'Roy Keane': '/legends/roy-keane.jpg',
    'Bryan Robson': '/legends/bryan-robson.jpg',
    'Wayne Rooney': '/legends/wayne-rooney.jpg',
    'Denis Law': '/legends/denis-law.jpg',
    'Jack Rowley': '/legends/jack-rowley.jpg',
    'Cristiano Ronaldo': '/legends/cristiano-ronaldo.jpg',
    'George Best': '/legends/george-best.jpg',
    'Marcus Rashford': '/legends/marcus-rashford.jpg',
    'Andy Cole': '/legends/andy-cole.jpg',
    'Ruud van Nistelrooy': '/legends/ruud-van-nistelrooy.jpg',
    'Eric Cantona': '/legends/eric-cantona.jpg',
    'Peter Schmeichel': '/legends/peter-schmeichel.jpg',
    'Bruno Fernandes': '/legends/bruno-fernandes.jpg',
};

export function legendImg(nameEn: string): string {
    return LEGEND_IMAGES[nameEn] ?? '';
}
