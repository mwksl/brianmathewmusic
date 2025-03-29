// Client-side media loading optimizations only
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ContactForm from '@/components/ContactForm'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import ServicesList from './ServicesList'
import AudioPlayer from '@/components/AudioPlayer'
import CreditsTooltip from '@/components/CreditsTooltip'

interface Service {
  name: string
  description: string
  id?: string | null
}

interface Genre {
  name: string
  id?: string | null
}

interface RecordingElement {
  name: string
  id?: string | null
}

interface GearItem {
  name: string
  description?: string
  id?: string | null
}

interface GearCategory {
  category: string
  items: GearItem[]
  id?: string | null
}

interface Studio {
  title: string
  about: string
  services: Service[]
  genres: Genre[]
  recordingElements: RecordingElement[]
  otherElementsText?: string
  otherGenresText?: string
  gear: GearCategory[]
  studioImage?: { url: string; id: string } | number
  servicesImage?: { url: string; id: string } | number
  genresImage?: { url: string; id: string } | number
  elementsImage?: { url: string; id: string } | number
  gearImage?: { url: string; id: string } | number
  additionalGearImages?: {
    id?: string | null
    image: { url: string; id: string } | number
    alt: string
  }[]
  audioSamples?: {
    id?: string | null
    title: string
    audioFile:
      | {
          id: string
          url: string
          filename: string
        }
      | number
    description?: string
  }[]
}

async function getStudio() {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const studio = await payload.find({
      collection: 'studio',
      limit: 1,
      depth: 2,
    })

    if (!studio.docs || studio.docs.length === 0) {
      return null
    }

    return studio.docs[0] as Studio
  } catch (_error) {
    console.error('Error fetching studio data:', _error)
    throw _error // Let Next.js handle the error
  }
}

export default async function StudioPage() {
  let studio
  try {
    studio = await getStudio()
  } catch (_error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        <div className="text-center py-8">
          <h1 className="font-heading text-4xl mb-4">Error Loading Studio</h1>
          <p>Please try again later.</p>
        </div>
      </div>
    )
  }

  if (!studio) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        <div className="text-center py-8">
          <h1 className="font-heading text-4xl mb-4">Studio</h1>
          <p>No studio information available.</p>
        </div>
      </div>
    )
  }

  const services = studio.services || []
  const genres = studio.genres || []
  const recordingElements = studio.recordingElements || []
  const gear = studio.gear || []

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col-reverse md:flex-row items-start gap-8">
          <div className="w-full md:w-2/5">
            <h1 className="font-heading text-5xl mb-6">{studio.title}</h1>
            <p className="text-lg text-text-muted">{studio.about}</p>
          </div>
          <div className="w-full md:w-3/5">
            {studio.studioImage ? (
              <div className="relative h-[700px]">
                <Image
                  priority
                  src={
                    typeof studio.studioImage === 'number'
                      ? `/api/media-with-prefix/${studio.studioImage}`
                      : studio.studioImage.url
                  }
                  alt="Studio"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  quality={85}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Audio Samples Section */}
      <section className="container mx-auto px-4 py-16 border-t border-white/10 bg-[#f5efe6]">
        <h2 className="font-heading text-4xl mb-10 text-center text-[#b25c65]">AUDIO SAMPLES</h2>
        {/* Client component for audio playback functionality */}
        <AudioPlayer />

        {studio.audioSamples && studio.audioSamples.length > 0 ? (
          <div className="max-w-6xl mx-auto px-4">
            {/* Grid layout for audio samples */}
            <div className="flex flex-wrap justify-center gap-6">
              {studio.audioSamples.map((sample, index) => {
                // Get audio file URL
                let audioUrl = ''
                if (typeof sample.audioFile === 'number') {
                  audioUrl = `/api/media-with-prefix/${sample.audioFile}`
                } else if (sample.audioFile?.url) {
                  audioUrl = sample.audioFile.url
                }

                return (
                  <div
                    key={sample.id || index}
                    className="border border-[#e0d5c8] p-4 rounded-sm w-64"
                  >
                    <h3 className="font-mono text-base mb-4 text-[#b25c65] tracking-wide uppercase min-h-[50px] line-clamp-2">
                      {sample.title}
                    </h3>

                    {/* Sample Title */}
                    <div className="mb-3">
                      <div className="w-full h-0.5 bg-[#e0d5c8] mt-1 mb-3"></div>
                    </div>

                    {/* Audio Element - optimized with lazy loading */}
                    <audio
                      className="w-full h-[30px] mt-2 mb-4"
                      src={audioUrl}
                      id={`audio-${index}`}
                      controls
                      preload="none"
                    />

                    {/* Credits with hover tooltip (client component) */}
                    {sample.description && (
                      <div className="block text-center border-t border-[#e0d5c8] pt-2 mt-2">
                        <CreditsTooltip description={sample.description} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-[#b25c65]">No audio samples available at this time.</p>
          </div>
        )}
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2">
            {/* Always show image 10 as specified in requirements */}
            <div className="relative h-[600px]">
              <Image
                src={
                  typeof studio.servicesImage === 'number'
                    ? `/api/media/${studio.servicesImage}`
                    : studio.servicesImage?.url || '/placeholder-image.jpg'
                }
                alt="Services"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="font-heading text-4xl mb-6">Services</h2>
            <ServicesList services={services} />
          </div>
        </div>
      </section>

      {/* Genres Section */}
      <section className="container mx-auto px-4 py-16 border-t border-white/10">
        <div className="flex flex-col-reverse md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="font-heading text-4xl mb-6">Genres I Can Record</h2>
            <div className="grid grid-cols-2 gap-4">
              {genres.map((genre) => (
                <div key={genre.id} className="p-4 bg-white/5 rounded-lg">
                  <p className="font-mono">{genre.name}</p>
                </div>
              ))}
            </div>
            {studio.otherGenresText && (
              <p className="mt-4 text-text-muted italic">{studio.otherGenresText}</p>
            )}
          </div>
          <div className="w-full md:w-1/2">
            {/* Always show image 1 as specified in requirements */}
            <div className="relative h-[600px]">
              <Image
                src={
                  typeof studio.genresImage === 'number'
                    ? `/api/media/${studio.genresImage}`
                    : studio.genresImage?.url || '/placeholder-image.jpg'
                }
                alt="Genres I Can Record"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recording Elements Section */}
      <section className="container mx-auto px-4 py-16 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2">
            {/* Always show image 2 as specified in requirements */}
            <div className="relative h-[600px]">
              <Image
                src={
                  typeof studio.elementsImage === 'number'
                    ? `/api/media/${studio.elementsImage}`
                    : studio.elementsImage?.url || '/placeholder-image.jpg'
                }
                alt="Elements I Can Record"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="font-heading text-4xl mb-6">Elements I Can Record</h2>
            <div className="grid grid-cols-2 gap-4">
              {recordingElements.map((element) => (
                <div key={element.id} className="p-4 bg-white/5 rounded-lg">
                  <p className="font-mono">{element.name}</p>
                </div>
              ))}
            </div>
            {studio.otherElementsText && (
              <p className="mt-4 text-text-muted italic">{studio.otherElementsText}</p>
            )}
          </div>
        </div>
      </section>

      {/* Gear Section */}
      <section className="container mx-auto px-4 py-16 border-t border-white/10">
        <div className="flex flex-col-reverse md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="font-heading text-4xl mb-6">Gear</h2>
            <div className="space-y-8">
              {gear.map((category) => (
                <div key={category.id}>
                  <h3 className="font-mono text-xl mb-4">{category.category}</h3>
                  <div className="grid gap-2">
                    {category.items?.map((item, index) => (
                      <div key={index} className="p-3 bg-white/5 rounded-lg">
                        <p className="font-mono text-sm">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            {studio.gearImage ? (
              <div className="relative h-[500px]">
                <Image
                  src={
                    typeof studio.gearImage === 'number'
                      ? `/api/media/${studio.gearImage}`
                      : studio.gearImage.url
                  }
                  alt="Gear"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ) : null}

            {/* Additional gear images from the additionalGearImages array */}
            {studio.additionalGearImages && studio.additionalGearImages.length > 0 ? (
              studio.additionalGearImages.map((gearImage, index) => {
                // Get image URL from either number ID or object
                const imageUrl =
                  typeof gearImage.image === 'number'
                    ? `/api/media/${gearImage.image}`
                    : gearImage.image.url

                return (
                  <div key={index} className="relative h-[500px]">
                    <Image
                      src={imageUrl}
                      alt={gearImage.alt || 'Studio Gear'}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )
              })
            ) : (
              // Fallback to the hardcoded images if no additional images are available yet
              <>
                {/* Fallback message when no images are available */}
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="font-mono">Please add gear images in the CMS</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl mb-4">Contact</h2>
            <p className="text-lg text-text-muted">
              Have a project in mind? Let&apos;s create something amazing together.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
