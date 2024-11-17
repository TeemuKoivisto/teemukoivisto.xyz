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
      <hr class="my-4" />
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
        Tekemällä tästä vielä kunnon rajapinnan, erilaiset palkanpäällisetkin voitaisiin helposti
        liittää palkanmaksuun jotta työntekijälle olisi <b>aina</b> absoluuttisen selvää paljon bruttotuloja
        on hänelle maksettu. Pidemmän päälle haluaisin että tulevaisuudessa Suomessakin puhuttaisiin
        enää vain bruttopalkoista, eläkekuluine kaikkineen, jotta yleinen tietoisuus työnteon hinnasta
        kehittyisi ja turhat verokiemurat poistuisivat. Erilliset työntekijän ja työnantajat eläkemaksut
        ovat yksi esimerkki, miten järjestelmästä on tehty turhan vaikea ymmärtää tavallisen tallaajan
        näkökulmasta.
      </p>
      <p>
        <a href="/palkanlaskija" class="underline hover:bg-gray-100">Tässä esimerkki</a>
        <a href="https://palkanlaskijanopas.fi" class="underline hover:bg-gray-100"
          >https://palkanlaskijanopas.fi</a
        >
        sivulta vuoden 2025 eri maksuista työntekijälle ja työnantajalle. Yritäpä tuosta sitten ymmärtää
        paljon sinulle oikeasti sitä palkkaa maksetaan. Työnantajalle palkanlaskusovellus osaa nämä hoitaa,
        mutta bruttomaksut olisivat <i>niin</i> paljon helpompia jäsentää ja laskea kuin x + eläke +
        työttömyysvakuutus + kaikenmaailman lounaslippusälät.
      </p>
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
          href="https://github.com/TeemuKoivisto/teemukoivisto.xyz/tree/main/packages/ansioverotili"
          >Lähdekoodi (GitHub)</a
        >
      </p>
    </article>
  </div>
</Card>

<style lang="postcss">
  article > p {
    @apply my-2 text-muted-foreground text-base;
  }
  article a {
    @apply underline hover:bg-gray-100;
  }
</style>
