class Parameter {
	joinSelection: Array<Join>;
	wherePredicateSelection: [Condition<ScalarComparisonPredicate>] | Array<Conjunction<ScalarComparisonPredicate>>;
	columnSelection: Array<Column>;
	havingPredicateSelection:
		| [Condition<NumericalComparisonPredicate>]
		| Array<Conjunction<NumericalComparisonPredicate>>;
	groupBy: Boolean;
	orderBy: Boolean;
	seed?: string | null;
	schema?: string;
}

class Join {
	joinType: JoinType;
	predicate?: NumericalComparisonPredicate.Equal;
	target?: JoinTarget;
}

class Condition<P extends Predicate> {
	predicate: P;
}

class Conjunction<P extends Predicate> {
	conjunctionType?: ConjunctionType;
	conditions?: [Condition<P>, Condition<P>];
}

class Column {
	columnType?: ColumnType;
	aggregateFunction?: AggregateFunction;
}

enum AggregateFunction {
	"Count",
	"Sum",
	"Average",
	"Min",
	"Max",
	"Any",
}

enum ColumnType {
	"ID",
	"String",
	"Date",
	"Numeric",
}

enum JoinTarget {
	"Table",
	"Subquery",
	"Self",
}

enum JoinType {
	"Left Inner Join",
	"Right Inner Join",
	"Inner Join",
	"Left Outer Join",
	"Right Outer Join",
	"Outer Join",
	"Cross Join",
}

enum ConjunctionType {
	"AND",
	"OR",
}

type Predicate = ScalarComparisonPredicate | VectorComparisonPredicate;

type ScalarComparisonPredicate = StringComparisonPredicate | NumericalComparisonPredicate | RangeComparisonPredicate;

enum StringComparisonPredicate {
	"Like" = "LIKE",
	"Not Like" = "NOT LIKE",
}

enum NumericalComparisonPredicate {
	"Equal" = "=",
	"Not Equal" = "<>",
	"Greater Than" = ">",
	"Less Than" = "<",
	"Greater Than Or Equal" = ">=",
	"Less Than Or Equal" = "<=",
}

enum RangeComparisonPredicate {
	"Between" = "BETWEEN",
	"Not Between" = "NOT BETWEEN",
}

// exemplary extension point
class SubQueryCondition {
	predicate: ScalarComparisonPredicate | VectorComparisonPredicate;
}
enum VectorComparisonPredicate {
	"In" = "IN",
	"Not In" = "NOT IN",
	"Is Null" = "IS NULL",
	"Is Not Null" = "IS NOT NULL",
}
