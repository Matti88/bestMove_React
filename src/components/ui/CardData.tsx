import { BellIcon, CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card"
 
type CardDataProposed =
{   title         : string,
    description   : string,
    substitle1    : string,
    substitle2    : string,
    pathToFileURL : string,
}

const CardDataComponent : React.FC<CardDataProposed> =  ({
  title,
  description,
  substitle1,
  substitle2,
  pathToFileURL 
}) => {
  return (
    <Card className={"w-[380px]"}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0" >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {substitle1}
                </p>
              </div>
            </div>
        </div>
        <div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0" >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {substitle2}
                </p>
              </div>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <CheckIcon className="mr-2 h-4 w-4" /> Load This Data
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardDataComponent;