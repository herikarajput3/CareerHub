import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel"
import { Button } from "./ui/button"

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "Graphic Designer",
    "Full Stack Developer",
    // "Mobile Developer",
    // "UI/UX Designer",
    // "DevOps Engineer",
    // "Machine Learning Engineer",
    // "Cybersecurity Analyst",
]

const CategoryCarousel = () => {
    return (
        <div>
            <Carousel className={"w-full max-w-xl mx-auto my-20"}>
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            // <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
                                <Button variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel