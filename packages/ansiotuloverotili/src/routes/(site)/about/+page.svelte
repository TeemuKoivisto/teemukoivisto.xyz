<script lang="ts">
  import { DateTime } from 'luxon'
  import { JsonLd, MetaTags } from 'svelte-meta-tags'

  import Card from '$components/Card.svelte'
  import { SITE_METADATA } from '$config'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  let { metatags, jsonld } = data

  const date = DateTime.fromISO(SITE_METADATA.datePublished)
</script>

<MetaTags {...metatags} />
<JsonLd schema={jsonld} />

<Card title="Selitys">
  <div class="flex flex-col gap-4">
    <article class="flex flex-col p-0 pb-0">
      <h2>Johdanto</h2>
      <p>
        Maailma muuttuu kiihtyvää tahtia kun uudet teknologiat kerroksittain mahdollistavat yhä
        nopeampia ja ketterämpiä tapoja luoda ja kehittää palveluita. Yritykset jotka tippuvat tästä
        kyydistä, jäävät jalkoihin. Sama päätee valtioita.
      </p>
      <p>
        Yksi tärkeimpiä valtion tehtäviä on tehdä työnteko helpoksi niin työntekijälle kuin
        työnantajalle. Suomi on ehkä yksi kehittyneimpiä maita digitalisaatiossa mutta minusta
        meillä olisi yhä paljon parannettavaa. Itselleni yksi ärsyttävimmistä asioista työnteossa on
        ollut <b>verokortti</b>.
      </p>
      <p>
        Verokortin funktio on tarjota yksi kiinteä veroprosentti jonka avulla työnantaja laskee
        työntekijän palkasta verohallinnolle menevän osuuden. Tämän veroprosentin laskenta on
        kuitenkin täyttä ajan ja mielenrauhan haaskausta koska koko prosessi vaatii että <b
          >tiedät</b
        > kuinka paljon tulet ansaitsemaan vuodessa heti tammikuusta alkaen.
      </p>
      <p>
        Jos lasket väärin, kuten usein käy, joudut käsipelin korjaamaan prosentin ja lähettämään
        uusitun verokortin työantajalle. Pahimmillaan tämän unohtaminen aiheuttaa valtavia
        veromätkyjä muuten tunnollisille kansalaisille, vieden lopunkin maun verojen maksusta. Tai
        lukiten ansaittuja tuloja pitkäksi aikaa verohallinnon syövereihin, odottaen
        veronpalautuskuukautta.
      </p>
      <hr class="my-8" />
      <h2>Ansiotuloverotili</h2>
      <p>
        Pitkään tätä ongelmaa mutustelleena tässä eräänä päivänä tuli päähäni ratkaisu: <u
          >luodaan jokaiselle suomalaiselle oma <b>ansiotuloverotili</b>.
        </u>
        Että mikä kysyt? Käytännössä se on uusi henkilökohtainen pankkitili jonka kautta
        <u>kaikki</u>
        tulot maksetaan palkansaajalle. Applikaatio sen taustalla sitten laskee dynaamisesti veroprosentin
        koko vuoden ansioiden perusteella, siirtäen palkan annetulle veronpalautustilille kuten aiemminkin.
        Työntekijän ei tarvitse huolehtia enää tulojensa arvioimisesta (aivan älytöntä touhua) ja työnantajakin
        joutuu tekemään enää vain yhden tilisiirron kahden sijaan (palkansaajalle & verottajalle).
      </p>
      <p>
        Tämä idea jossain määrin on kummunnut <a href="https://www.revolut.com/">Revolutista</a>,
        jossa käyttäjille luodaan välittömästi aina oma liettualainen pankkitili johon palkan sun
        muun voi maksaa. Homman juju on koko prosessin vaivattomuus, enkä usko että Suomessakaan
        homman tekninen toteutus olisi suuren työn takana. Tämän lisäksi palvelua pystyisi varmasti
        kehittämään paljon monipuolisemmaksi. Esimerksi toiminimi-yrittäminen voitaisiin tehdä
        jokaiselle täysin kitkattomaksi pätkätöiden ja yrittämisen helpottamiseksi, eikä
        välikäsiä—Ukkoja tai muita—enää tarvittaisi.
      </p>
      <p>
        Tekemällä tästä vielä kunnon rajapinnan tai vain käyttämällä hyväksi pankkisiirron
        viesti-kenttää, erilaiset palkanpäällisetkin voitaisiin helposti liittää palkanmaksuun jotta
        työntekijälle olisi <b>aina</b> absoluuttisen selvää paljon bruttotuloja hänelle on maksettu.
      </p>
      <p>
        Pidemmän päälle haluaisin että tulevaisuudessa Suomessakin puhuttaisiin enää vain
        bruttopalkoista, eläkekuluine kaikkineen, jotta yleinen tietoisuus työnteon hinnasta
        kehittyisi ja turhat verokiemurat poistuisivat. Kansainvälistyvässä ja etätyöllistyvässsä
        maailmassa olisi tärkeää että suomalainen työntekijä osaisi itsevarmasti laskea oman
        työpanoksensa hinnan sekä millä tavalla hänelle tulisi maksaa palkka. Harmaan taloudenkin
        määrä voisi vähentyä, kun ihmisten palkkaaminen olisi yhtä helppoa kuin työsopimuksen
        allekirjoitus ja ansiotuloverotilin lähetys.
      </p>
      <p>
        <a href="/palkanlaskija" class="font-bold underline hover:bg-gray-100">Tässä esimerkki</a>
        <a href="https://palkanlaskijanopas.fi" class="underline hover:bg-gray-100"
          >https://palkanlaskijanopas.fi</a
        >
        sivulta vuoden 2025 eri maksuista työntekijälle ja työnantajalle. Yritäpä tuosta sitten ymmärtää
        paljon sinulle oikeasti sitä palkkaa maksetaan. Työnantajalle palkanlaskusovellus osaa nämä hoitaa,
        mutta bruttomaksut olisivat <i>niin</i> paljon helpompia jäsentää ja laskea kuin x + eläke +
        työttömyysvakuutus + kaikenmaailman lounaslippusälät.
      </p>
      <h2>Muita tapoja</h2>
      <p>
        Palloteltuani tätä ongelmaa muiden kanssa, näen myös että on olemassa vaihtoehtoisia tapoja
        toteuttaa ansiotuloverotilin konsepti:
      </p>
      <h3>Verohallinnon tili + viitenumero</h3>
      <p>
        Tämä olisi muuten sama ratkaisu kuin nykyinen, mutta että palkka siirrettäisiin
        kokonaisuudessaan verohallinnon tilille joka maksaisi sen edelleen palkansaajalle. Jos
        viitenumero kuitenkin syystä tai toisesta olisi väärin, tämä olisi äärimmäisen haitallista
        niin palkansaajalle kuin maksajallekin. Henkilökohtainen tili tekisi sössimisen
        mahdottomaksi.
      </p>
      <h3>Veroprosentin haku palkanmaksun yhteydessä</h3>
      <p>
        Yksi vaihtoehto olisi hakea aina veroprosentti palkanmaksun yhteydessä rajapinnasta, kuten
        tulorekisteristä, joka laskisi ansiotuloveroprosentin suorituksen mukaan. Tämä nykyään on <a
          href="https://www.vero.fi/yritykset-ja-yhteisot/verot-ja-maksut/yritys_tyonantajana/verokorttiohjeet/"
          >vero.fi</a
        >
        mukaan mahdollista, vaikka selonteko jättääkin epäselväksi joutuuko palkansaaja edelleen päivittämään
        itse verokorttinsa. Mielestäni tämä on kuitenkin liian monimutkainen toteutus ja palkanmaksusysteemistä
        riippuvainen. Joka yritys joka haluaisi maksaa Suomen sisällä palkkoja, joutuisi joko integroimaan
        veroviraston järjestelmiin tai käyttämään Suomen markkinoille kehitettyä palkanmaksupalvelua.
      </p>
      <h3>Kolmannen osapuolen pankkitili</h3>
      <p>
        Tietenkin pankit voisivat tarjota ansiotulovero-valmiin tilin suoraan käyttäjille, minkä
        tilinumeron he voisivat lähettää työnantajalle. Tämä mielestäni olisi paras kompromissi,
        koska järjestelmän monimutkaisuus olisi piilotettu palkanmaksajalta kuin saajalta pankin
        systeemeihin. En ole kuitenkaan varma, onko verokortin päivitys rajapinnan kautta tällä
        hetkellä mahdollista sekä kuinka paljon kehityskustannuksia moisen systeemin luonti vaatisi.
        Hölmöähän se tavallaan olisi, että jokainen pankki joutuisi koodaamaan oman version
        palvelusta kun verohallinto voisi sen tehdä kaikille valmiiksi. Varsinkin ottaen huomioon
        verolaskennan monimutkaisuuden.
      </p>
      <p>
        Se ratkaisi kuitenkin ansiotuloverotilin suurimman ongelman, joka on pankkitilien hallinta
        yli 5 miljoonalle ihmiselle. Milloin tili tulisi luoda (henkilötunnuksen yhteydessä(?)) ja
        vapauttaa, olisivat keskivaikeita muttei mahdottomia ongelmia. Palkkasuorituksen lähetys
        vahingossa henkilökohtaiselle pankkitilille olisi toinen ongelma, johon
        ei-palkanlaskusovellusta käyttävä voisi kompastua. Atv-tilin tulisi olla helposti
        tunnistettava, tietenkin, mutta käytännössä tämä olisi sama tilanne kuini
        toiminimi-yrittäjällä.
      </p>
      <h2>Loppusanat</h2>
      <p>
        Suomessa on ollut paljon puhetta kilpailukyvyn parantamisesta ja kuinka työelämästä ja
        yrittämisestä voitaisiin tehdä entistä ketterämpää. Minusta paras tapa tähän olisi luoda
        Suomeen <i>maailman helpoin</i> verojärjestelmä niin palkansaajille kuin yrityksillekin. Yksinkertaistamalla
        ja tehostamalla prosesseja me luomme hedelmällisemmän ympäristön asioiden tekemiselle, sen sijaan
        että ne lannistaisivat meitä monimutkaisuudellaan. Minusta ansioverotulotili olisi tähän yksi
        parannus.
      </p>
      <p class="flex flex-col">
        <b>Teemu Koivisto {date.toFormat('dd.MM.yyyy')}</b>
        <i>teemukoivisto.xyz ~АТ~ gmail.com</i>
      </p>
      <p>
        <a
          href="https://github.com/TeemuKoivisto/teemukoivisto.xyz/tree/main/packages/ansiotuloverotili"
          >Lähdekoodi (GitHub)</a
        >
      </p>
    </article>
  </div>
</Card>

<style lang="postcss">
  article > p {
    @apply my-2 pl-[1px] text-muted-foreground text-base;
  }
  article a {
    @apply underline hover:bg-gray-100;
  }
  article h2 {
    @apply text-2xl mt-2;
  }
  article h3 {
    @apply text-xl mt-2;
  }
</style>
