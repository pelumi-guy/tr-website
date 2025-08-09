import Search from '../layout/Search';
import styles from '../../../app/page.module.css';

const SearchForYourDreamHome = () => {
    return (
        <section className='py-5'>
            <hgroup className="section-heading">
                <h2>Your AI-Powered Property Search</h2>
                <p>Simply tell us what you&apos;re looking for, and we&apos;ll help you make it a reality, stress-free.</p>
            </hgroup>

            <Search classNames='landing-main-search rounded-pill mt-4' darkButton aiSearch key={'home-ai-search'} />

            {/* <div className="row">
                <div className="col-6">
                    <select name='Location' id='location' title='location' className='landing-search-filter'>
                        <option value="" disabled selected hidden>Location</option>
                        <option value="Lagos">Lekki Phase One</option>
                        <option value="Abuja">Ikate</option>
                        <option value="Abuja">Orchid</option>
                    </select>
                </div>
                <div className="col-6">
                    <select name='Property Type' id='propertyType' title='propertyType' className='landing-search-filter'>
                        <option value="" disabled selected hidden>Property Type</option>
                        <option value="Lagos">Terrace</option>
                        <option value="Abuja">Semi-detached</option>
                        <option value="Abuja">Fully Detached</option>
                    </select>
                </div>
            </div> */}



        </section>
    )
}

export default SearchForYourDreamHome