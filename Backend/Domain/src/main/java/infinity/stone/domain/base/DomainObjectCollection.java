package infinity.stone.domain.base;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

// need to fix logic for dirty check
public class DomainObjectCollection<T extends DomainBase> implements List<T> {

	private List<T> items;
	private List<T> itemsToDelete;
	private boolean isDirty;
	private boolean isLoaded;

	public DomainObjectCollection() {
		items = new ArrayList<T>();
		itemsToDelete = new ArrayList<T>();
		isDirty = false;
		isLoaded = false;
	}

	public boolean isLoaded() {
		return isLoaded;
	}

	public void setLoaded(boolean isLoaded) {
		this.isLoaded = isLoaded;
	}

	public boolean isDirty() {
		return isDirty;
	}

	public void setDirty(boolean isDirty) {
		this.isDirty = isDirty;
	}

	@Override
	public int size() {
		return items.size();
	}

	@Override
	public boolean isEmpty() {
		return items.size() == 0;
	}

	@Override
	public boolean contains(Object o) {
		return items.contains(o);
	}

	@Override
	public Iterator<T> iterator() {
		return items.iterator();
	}

	@Override
	public Object[] toArray() {
		return items.toArray();
	}

	@SuppressWarnings("hiding")
	@Override
	public <T> T[] toArray(T[] a) {
		return items.toArray(a);
	}

	@Override
	public boolean add(T e) {
		boolean isSucceeded = items.add(e);

		if (!isSucceeded)
			return false;

		if (e.isDirty()) {
			setDirty(true);
		}

		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean remove(Object o) {
		boolean isSucceeded = items.remove(o);

		if (!isSucceeded)
			return false;

		if (((T) o).isPersisted()) {
			this.itemsToDelete.add((T) o);
			setDirty(true);
		}

		return true;
	}

	@Override
	public boolean containsAll(Collection<?> c) {
		return items.containsAll(c);
	}

	@Override
	public boolean addAll(Collection<? extends T> c) {
		boolean isSucceeded = items.addAll(c);

		if (!isSucceeded)
			return false;

		for (T item : c) {
			if (item.isDirty()) {
				setDirty(true);
				return true;
			}
		}

		return true;
	}

	@Override
	public boolean addAll(int index, Collection<? extends T> c) {
		boolean isSucceeded = items.addAll(index, c);

		if (!isSucceeded)
			return false;

		for (T item : c) {
			if (item.isDirty()) {
				setDirty(true);
				return true;
			}
		}

		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean removeAll(Collection<?> c) {
		boolean isSucceeded = items.removeAll(c);

		if (!isSucceeded)
			return false;

		for (Object o : c) {
			if (((T) o).isPersisted()) {
				this.itemsToDelete.add((T) o);
				setDirty(true);
			}
		}

		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean retainAll(Collection<?> c) {
		List<T> itemToRemove = new ArrayList<T>();

		for (Object item : c) {
			itemToRemove.add((T) item);
		}

		boolean isSucceeded = items.retainAll(c);

		if (!isSucceeded)
			return false;

		for (T item : itemToRemove) {
			if (item.isPersisted()) {
				this.itemsToDelete.add(item);
				setDirty(true);
			}
		}

		return true;
	}

	@Override
	public void clear() {
		for (T item : items) {
			if (item.isPersisted()) {
				this.itemsToDelete.add(item);
				setDirty(true);
			}
		}

		items.clear();
	}

	/**
	 * use this method to find an object from collection
	 *
	 * @param id of type Object
	 * @author Nitesh Kumar
	 * @return object if exists with given id or null if not matched
	 */
	public T find(Object id) {
		for (T item : this.items) {
			if (item.getObjectId() != null && item.getObjectId().equals(id)) {
				return item;
			}
		}
		return null;
	}

	/**
	 * use this method to find an object from collection
	 *
	 * @param object of type Object
	 * @author Nitesh Kumar
	 * @return object if exists with given object id or null if not matched
	 */
	public T find(T object) {
		if (object == null) {
			return null;
		}

		for (T item : this.items) {
			if (item.getObjectId() != null && item.getObjectId().equals(object.getObjectId())) {
				return item;
			}
		}
		return null;
	}

	@Override
	public T get(int index) {
		return items.get(index);
	}

	@Override
	public T set(int index, T element) {
		if (element.isDirty()) {
			setDirty(true);
		}
		return items.set(index, element);
	}

	@Override
	public void add(int index, T element) {
		items.add(index, element);

		if (element.isDirty()) {
			setDirty(true);
		}
	}

	@Override
	public T remove(int index) {
		T removedItem = items.remove(index);

		if (removedItem != null && removedItem.isPersisted()) {
			this.itemsToDelete.add(removedItem);
			setDirty(true);
		}

		return removedItem;
	}

	@Override
	public int indexOf(Object o) {
		return items.indexOf(o);
	}

	@Override
	public int lastIndexOf(Object o) {
		return items.indexOf(o);
	}

	@Override
	public ListIterator<T> listIterator() {
		return items.listIterator();
	}

	@Override
	public ListIterator<T> listIterator(int index) {
		return items.listIterator(index);
	}

	@Override
	public List<T> subList(int fromIndex, int toIndex) {
		return items.subList(fromIndex, toIndex);
	}

	public void saveAll() {
		persistRemovedItems();
		for (T object : this.items) {
			if (object.isDirty()) {
				object.save();
			}
		}
	}

	private void persistRemovedItems() {
		for (T object : this.itemsToDelete) {
			if (object.isPersisted()) {
				object.delete();
			}
		}
	}

	public void deleteAll() {
		persistRemovedItems();
		for (T object : this.items) {
			if (object.isPersisted()) {
				object.delete();
			}
		}
	}

}
