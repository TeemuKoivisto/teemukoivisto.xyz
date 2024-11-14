<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import login from '@iconify-icons/lucide/arrow-left'
</script>

<h1 class="mt-12 mb-12 font-title text-5xl flex items-center justify-between w-full">
  <a href="/" class="p-4 hover:bg-blue-100/30 transition-colors rounded-full"
    ><Icon icon={login} /></a
  ><span>Selitys</span>
  <button class="p-4 bg-blue-100 rounded-full invisible"><Icon icon={login} /></button>
</h1>

<div class=" h-full w-full flex items-center">
  <section
    class="mb-16 w-[720px] p-8 pt-8 mx-auto bg-white text-container rounded-2xl flex flex-col shadow-xl"
  >
    <div class="flex flex-col gap-4">
      <article class="flex flex-col p-0 pb-0">
        <p>
          Maailma muuttuu kiihtyvää tahtia kun uudet teknologiat kerroksittain mahdollistavat yhä
          nopeampia ja ketterämpiä tapoja luoda ja kehittää palveluita. Yritykset jotka tippuvat
          tästä kyydistä, jäävät jalkoihin. Sama päätee valtioita.
        </p>
        <p>
          Yksi tärkeimpiä valtion tehtäviä on tehdä työnteko helpoksi niin työntekijälle kuin
          työnantajalle. Suomi on ehkä kehittyneimpiä maita digitalisaation käytössä tässä mutta
          minusta meillä olisi vielä paljon parannettavaa. Itselleni yksi ärsyttävimmistä asioista
          työnteossa on ollut <b>verokortti</b>.
        </p>
        <p>
          Verokortin funktio on generoida yksi kiinteä veroprosentti jonka avulla työnantaja tietää
          paljon työntekijän palkoista pitää maksaa verohallinnolle. Tämän veroprosentin laskenta on
          kuitenkin täyttä ajan ja mielenrauhan haaskausta koska koko prosessi vaatii että <b
            >tiedät</b
          > absoluuttisesti paljon tulet ansaitsemaan vuodessa heti Tammikuusta alkaen.
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
          Pitkään tätä ongelmaa mutustelleena löysin viimein ongelmaan ratkaisun: <u
            >luodaan jokaiselle suomalaiselle oma <b>ansiotuloverotili</b>.
          </u>
          Että mikä kysyt? Käytännössä se on uusi henkilökohtainen pankkitili jonka kautta
          <u>kaikki</u>
          tulot maksetaan palkansaajalle. Sovellus sen taustalla sitten laskee dynaamisesti veroprosentin
          koko vuoden ansioiden perusteella, siirtäen palkan asetetulle veronpalautustilille kuten aiemminkin.
          Työntekijän ei tarvitse huolehtia enää tulojensa laskemisesta (aivan älytöntä touhua) ja työnantajakin
          joutuu tekemään enää vain yhden tilisiirron kahden sijasta (palkansaajalle & verovirastoon).
        </p>
        <p>
          Tämän idean sain jossain määrin Revolutista jossa käyttäjille luodaan välittömästi aina
          oma liettualainen pankkitili johon palkan sun muun voi maksaa. Homman juju on koko
          prosessin vaivattomuus enkä usko että Suomessakaan homman tekninen toteutus olisi suuren
          työn takana. Tämän lisäksi palvelua pystyisi varmasti kehittämään paljon
          monipuolisemmaksi. Esimerksi toiminimi-yrittäminen voitaisiin tehdä jokaiselle täysin
          kitkattomaksi pätkätöiden ja yrittämisen helpottamiseksi, eikä Ukkoja tai muita tarvitsisi
          enää välikäsiä.
        </p>
        <p>
          Ja jos hommaan lisäisi kunnon rajapinnan, kaikenmaailman maksut sun muut pystyisi helposti
          visualisoimaan jotta työntekijälle olisi <b>aina</b> absoluuttisen selvää paljon bruttotuloja
          on hänelle maksettu. Pidemmän päälle haluaisin että tulevaisuudessa Suomessakin puhuttaisiin
          enää vain bruttopalkoista, eläkekuluine kaikkineen, jotta yleinen tietoisuus työnteon hinnasta
          kehittyisi ja turhat verokiemurat poistuisivat. Pelkästään jo erilliset työntekijän ja työnantajan
          eläkemaksut ovat täysin turha keksintö, tehty vain poliittikkojen toimesta ihmisten hämäämiseksi.
        </p>
        <p>
          <a href="/palkanlaskija" class="underline hover:bg-gray-100">Tässä esimerkki</a>
          <a href="https://palkanlaskijanopas.fi" class="underline hover:bg-gray-100"
            >https://palkanlaskijanopas.fi</a
          >
          sivulta vuoden 2025 eri maksuista työntekijälle ja työnantajalle. Yritäpä tuosta sitten ymmärtää
          paljon sinulle oikeasti sitä palkkaa maksetaan. Työnantajalle palkanlaskusovellus osaa nämä
          hoitaa, mutta bruttomaksut olisivat <i>niin</i> paljon helpompia jäsentää ja laskea kuin x
          + eläke + työttömyysvakuutus + kaikenmaailman lounaslippusälät. Lounasedunkin voisi korvata
          vain ravintola ALV:ia laskemalla, täysin merkityksetön lisä joka rankaisee niitä jotka tekevät
          ruuan kotona tai unohtavat vinguttaa joka ikinen arkipäivä, kasaten järkyttävän saldon tilille.
        </p>
      </article>
    </div>
  </section>
</div>

<style lang="postcss">
  article > p {
    @apply my-2 text-muted-foreground text-base;
  }
</style>
