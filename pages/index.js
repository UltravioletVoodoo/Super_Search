import Head from 'next/head'
import Base from '../components/base'

export default function Index() {
  return (
    <>
      <Base />
      <h1>Super Search</h1>
      <input type="search" placeholder="Search here!"></input>
    </>
  )
}
