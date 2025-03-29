
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Calculator, 
  Check, 
  Home, 
  Building, 
  Layers, 
  Users
} from 'lucide-react';
import { materialTypes, laborRates, calculateConstructionCost } from '@/lib/data';
import { formatPrice } from '@/lib/utils';

const CalculatorPage = () => {
  const [calculationParams, setCalculationParams] = useState({
    area: 1000,
    materialTypeId: 'medium',
    laborRateId: 'skilled',
    durationDays: 120,
  });
  
  const [result, setResult] = useState<any>(null);
  
  const handleInputChange = (field: string, value: any) => {
    setCalculationParams(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleCalculate = () => {
    const calculationResult = calculateConstructionCost(
      calculationParams.area,
      calculationParams.materialTypeId,
      calculationParams.laborRateId,
      calculationParams.durationDays
    );
    
    setResult(calculationResult);
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold mb-4">Construction Cost Calculator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estimate construction costs based on material type, labor cost, and property size. 
              Get accurate estimates for your construction project in Islamabad.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    Input Parameters
                  </CardTitle>
                  <CardDescription>
                    Provide details about your construction project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="area">Property Size (sq. ft.)</Label>
                    <Input
                      id="area"
                      type="number"
                      value={calculationParams.area}
                      onChange={(e) => handleInputChange('area', Number(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the total area you want to construct
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="materialType">Material Quality</Label>
                    <Select
                      value={calculationParams.materialTypeId}
                      onValueChange={(value) => handleInputChange('materialTypeId', value)}
                    >
                      <SelectTrigger id="materialType">
                        <SelectValue placeholder="Select material quality" />
                      </SelectTrigger>
                      <SelectContent>
                        {materialTypes.map(material => (
                          <SelectItem key={material.id} value={material.id}>
                            {material.name} - {formatPrice(material.costPerSqFt)}/sq.ft.
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {materialTypes.find(m => m.id === calculationParams.materialTypeId)?.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="laborRate">Labor Rate</Label>
                    <Select
                      value={calculationParams.laborRateId}
                      onValueChange={(value) => handleInputChange('laborRateId', value)}
                    >
                      <SelectTrigger id="laborRate">
                        <SelectValue placeholder="Select labor rate" />
                      </SelectTrigger>
                      <SelectContent>
                        {laborRates.map(labor => (
                          <SelectItem key={labor.id} value={labor.id}>
                            {labor.name} - {formatPrice(labor.ratePerDay)}/day
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {laborRates.find(l => l.id === calculationParams.laborRateId)?.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Project Duration (days)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={calculationParams.durationDays}
                      onChange={(e) => handleInputChange('durationDays', Number(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Estimated time to complete the construction
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleCalculate} className="w-full">
                    Calculate Cost
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="mt-8">
                <h3 className="text-xl font-heading font-semibold mb-4">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-teal-100 dark:bg-teal-900/30 rounded-full p-2 mr-3 mt-1">
                      <Layers className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Material Costs</h4>
                      <p className="text-muted-foreground text-sm">
                        Material costs are calculated based on the quality selected and total area. Higher quality materials cost more but provide better finishes and durability.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-teal-100 dark:bg-teal-900/30 rounded-full p-2 mr-3 mt-1">
                      <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Labor Costs</h4>
                      <p className="text-muted-foreground text-sm">
                        Labor costs depend on the skill level required, the project duration, and team size needed for your project area.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-teal-100 dark:bg-teal-900/30 rounded-full p-2 mr-3 mt-1">
                      <Building className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Additional Costs</h4>
                      <p className="text-muted-foreground text-sm">
                        Includes permit fees, architectural designs, utility connections, and other miscellaneous expenses (typically 15-20% of material costs).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              {result && result.success ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Estimated Construction Cost</CardTitle>
                    <CardDescription>
                      Based on your inputs, here's the breakdown of estimated costs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-center mb-6">
                      {formatPrice(result.breakdown.totalCost)}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Material Costs:</span>
                        <span className="font-medium">{formatPrice(result.breakdown.materialCost)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Labor Costs:</span>
                        <span className="font-medium">{formatPrice(result.breakdown.laborCost)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Additional Costs:</span>
                        <span className="font-medium">{formatPrice(result.breakdown.additionalCosts)}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total:</span>
                        <span>{formatPrice(result.breakdown.totalCost)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg mt-6">
                      <h4 className="font-medium mb-2">Cost per Square Foot</h4>
                      <div className="flex justify-between items-center">
                        <span>Average cost per sq. ft.:</span>
                        <span className="font-medium">
                          {formatPrice(result.breakdown.totalCost / calculationParams.area)}/sq.ft.
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col space-y-4">
                    <p className="text-sm text-muted-foreground">
                      This is an estimate based on average costs in Islamabad. Actual costs may vary based on specific requirements, location, and market conditions.
                    </p>
                    <Button variant="outline" onClick={() => window.print()}>
                      Print Estimate
                    </Button>
                  </CardFooter>
                </Card>
              ) : result && !result.success ? (
                <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
                  <CardHeader>
                    <CardTitle className="text-red-600">Error in Calculation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{result.error}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" onClick={() => setResult(null)}>
                      Try Again
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div>
                  <h3 className="text-2xl font-heading font-semibold mb-4">Construction Types</h3>
                  
                  <Tabs defaultValue="residential">
                    <TabsList className="w-full mb-6">
                      <TabsTrigger value="residential">Residential</TabsTrigger>
                      <TabsTrigger value="commercial">Commercial</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="residential" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Home className="mr-2 h-5 w-5" />
                            Single-Family Home
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            Typical costs for constructing a single-family home in Islamabad vary based on location and finishes.
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Check className="text-teal-500 mr-2 h-4 w-4" />
                              <span className="text-sm">Standard Quality: PKR 3,500 - 4,500 per sq.ft.</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="text-teal-500 mr-2 h-4 w-4" />
                              <span className="text-sm">Medium Quality: PKR 5,000 - 6,000 per sq.ft.</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="text-teal-500 mr-2 h-4 w-4" />
                              <span className="text-sm">Premium Quality: PKR 7,500 - 9,000 per sq.ft.</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="text-teal-500 mr-2 h-4 w-4" />
                              <span className="text-sm">Luxury Quality: PKR 10,000+ per sq.ft.</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Building className="mr-2 h-5 w-5" />
                            Apartment Building
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            Multi-unit residential buildings have different cost structures due to shared facilities and economies of scale.
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Check className="text-teal-500 mr-2 h-4 w-4" />
                              <span className="text-sm">Basic Apartments: PKR 3,000 - 4,000 per sq.ft.</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="text-teal-500 mr-2 h-4 w-4" />
                              <span className="text-sm">Mid-tier Apartments: PKR 4,500 - 5,500 per sq.ft.</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="text-teal-500 mr-2 h-4 w-4" />
                              <span className="text-sm">Luxury Apartments: PKR 6,000 - 8,000 per sq.ft.</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="commercial" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Building className="mr-2 h-5 w-5" />
                            Office Buildings
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            Commercial office spaces require different specifications for systems, safety, and layout.
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Check className="text-teal-500 mr-2 h-4 w-4" />
                              <span className="text-sm">Basic Office Space: PKR 4,000 - 5,000 per sq.ft.</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="text-teal-500 mr-2 h-4 w-4" />
                              <span className="text-sm">Standard Office Buildings: PKR 5,500 - 7,000 per sq.ft.</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="text-teal-500 mr-2 h-4 w-4" />
                              <span className="text-sm">Premium Corporate Buildings: PKR 8,000 - 12,000 per sq.ft.</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Building className="mr-2 h-5 w-5" />
                            Retail Spaces
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            Retail construction costs vary based on location and interior finishes.
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Check className="text-teal-500 mr-2 h-4 w-4" />
                              <span className="text-sm">Basic Retail: PKR 3,500 - 4,500 per sq.ft.</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="text-teal-500 mr-2 h-4 w-4" />
                              <span className="text-sm">Shopping Centers: PKR 5,000 - 7,000 per sq.ft.</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="text-teal-500 mr-2 h-4 w-4" />
                              <span className="text-sm">High-end Retail: PKR 8,000 - 15,000 per sq.ft.</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CalculatorPage;
