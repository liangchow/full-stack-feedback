export default async function Page({params}){

    const UID = (await params).UID
    return <h1>{UID}</h1>
}