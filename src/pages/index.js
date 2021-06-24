import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout/layout'
import SearchInput from '../components/Searchinput/Searchinput';
import CountriesTable from '../components/CountriesTable/CountriesTable';

export default function Home({ countries }) {
  console.log(countries);

  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
  (country) => 
    country.name.toLowerCase().includes(keyword) || 
    country.region.toLowerCase().includes(keyword) ||
    country.subregion.toLowerCase().includes(keyword)
  );

    const onInputChange = (e) =>{
      e.preventDefault();

      setKeyword(e.target.value.toLowerCade());
    }

  return <Layout>~
    <div className={styles.InputContainer}>
    <div className={styles.counts}>Found {countries.length} countries</div>
    <div className={styles.Input}>
    <SearchInput placeholder="Filter by name, Region or SubRegion" onChange={onInputChange}
/> 
    </div>


    </div>

    <CountriesTable countries={filteredCountries} />

  </Layout>
    
  
}
export const getStaticProps = async () => {
  const rest = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await rest.json();

  return {
    props:{
      countries,
    }

  }
}
